const { touchDown, touchMove, touchUp, usleep, appActivate, keyDown, keyUp, getColor, getColors, stop } = at
const { intToRgb } = utils
const {
    // basic gestures
    swipe, sleep, tap, tapMiddle,
    // color & text recognition, polling
    readText, areColorsPresentInRegion, poll
} = require(`${at.rootDir()}/bot-common/bot-common`);
const {
    getBaseMapForRegion, findXButton
} = require(`${at.rootDir()}/bot-common/x-detector`);

const HOME_MENU_BUTTON_REGION = {x: 66, y: 1232, width: 133, height: 58};
const MAIN_MENU_AD_BUTTON_REGION = {x: 38, y: 200, width: 109, height: 89};

// if there's an ad available then there will be a red pixel that we can find
const MAIN_MENU_AD_AVAILABLE_COLORS = [{ color: 13326691, x: 0, y: 0 }];

const AD_DONT_WATCH_VIDEO_REGION = {x: 603, y: 1086, width: 390, height: 165};
const AD_WATCH_VIDEO_REGION = {x: 1051, y: 1086, width: 397, height: 165};
const AD_APP_STORE_DONE_REGION = {x: 350, y: 77, width: 89, height: 37};

const AD_TOP_LEFT_REGION = {x: 0, y: 0, width: 120, height: 120};
const AD_TOP_RIGHT_REGION = {x: 1928, y: 0, width: 120, height: 120};

const AD_CHEST_BUTTON = {x: 1819, y: 1171, width: 132, height: 126};
const AD_CONFIRM_REWARD_OK_BUTTON = {x: 823, y: 973, width: 402, height: 133};
// "Could not receive" because we have too many keys, or "Completed today's treasure"
const AD_REWARD_FINISHED_OK_BUTTON = {x: 984, y: 844, width: 85, height: 56};
const AD_FAILED_TO_PROCESS_CAPTION_REGION = {x: 829, y: 676, width: 389, height: 60};

const BUY_STONES_BUTTON_REGION = {x: 1400, y: 234, width: 39, height: 38};
// rectangle around the words "Earn 10"
const EARN_10_STONES_REGION = {x: 929, y: 419, width: 166, height: 53};
const EARN_10_STONES_OK_REGION = {x: 888, y: 917, width: 248, height: 73};
// X button to get out of the "Buy Chronos Stones" screen
const BUY_STONES_EXIT_REGION = {x: 1901, y: 235, width: 79, height: 56};

sleep(0.5);

function watchAndCloseAd() {
    // sleep(55);
    sleep(1);

    if(readText(AD_APP_STORE_DONE_REGION) == "Done") {
        // it was an app store ad, click on the Done button
        tapMiddle(AD_APP_STORE_DONE_REGION);
    } else {
        // look for an X button in the top corners
        var regions = [AD_TOP_LEFT_REGION, AD_TOP_RIGHT_REGION];
        regionBaseMaps = [getBaseMapForRegion(regions[0]), getBaseMapForRegion(regions[1])];
        result = findXButton(regionBaseMaps);
        
        if(result.score <= 0) {
            alert("Unable to find X for ad, stopping script");
            at.stop();
        } else {
            tap(regions[result.n].x + result.x, regions[result.n].y + result.y);
        }
    }
    sleep(3);
}

// watch the 5 daily ads
while(true) {
    tapMiddle(HOME_MENU_BUTTON_REGION);
    sleep(1);
    if(!areColorsPresentInRegion(MAIN_MENU_AD_AVAILABLE_COLORS, MAIN_MENU_AD_BUTTON_REGION )) {
        // no more ads to watch. tap some harmless point to get out of the main menu
        tapMiddle(1000, 800);
        sleep(0.5);
        break;
    }
    tapMiddle(MAIN_MENU_AD_BUTTON_REGION);
    sleep(1.5);

    tapMiddle(AD_WATCH_VIDEO_REGION);
    sleep(2);
    if(readText(AD_FAILED_TO_PROCESS_CAPTION_REGION) == "Failed to process") {
        // start the loop again
        continue;
    }    

    watchAndCloseAd();

    if(readText(AD_FAILED_TO_PROCESS_CAPTION_REGION) == "Failed to process") {
        // start the loop again
        continue;
    }
    tapMiddle(AD_CHEST_BUTTON);
    sleep(1);
    tapMiddle(AD_CONFIRM_REWARD_OK_BUTTON);
    sleep(1);

    while(readText(AD_REWARD_FINISHED_OK_BUTTON, 0.5, 0) == "OK") {
        // "Could not receive" because we have too many keys
        // "Completed today's treasure"
        tapMiddle(AD_REWARD_FINISHED_OK_BUTTON);
        sleep(0.5);
    }

    // just to simplify things, start from the Home screen for each loop
    // TODO make this more robust by looking for the Don't Watch button
    // for now I think it's ok to tap this if we were already dumped out of the ad dialog 
    //   (due to an error, or completed all of the ads for today)
    // but if we're in the Main Menu it's the dreams button so watch out!
    tapMiddle(AD_DONT_WATCH_VIDEO_REGION);
    sleep(0.5);
}

// watch the ad in the "Buy Chronos Stone" screen
tapMiddle(HOME_MENU_BUTTON_REGION);
sleep(1);
tapMiddle(BUY_STONES_BUTTON_REGION);
sleep(1.5);
if(readText(EARN_10_STONES_REGION) == "Earn 10") {
    tapMiddle(EARN_10_STONES_REGION);
    watchAndCloseAd();
    
    // look explicitly for the OK button, then click it
    if(readText(EARN_10_STONES_OK_REGION, 0.5, 0) == "OK") {
        tapMiddle(EARN_10_STONES_OK_REGION);
        sleep(1);
        tapMiddle(BUY_STONES_EXIT_REGION);
        sleep(1);
    } else {
        // something went wrong and I really don't want to take risks with this screen!
        alert("Didn't find the OK button after watching an ad!")
        at.stop();
    }
} else {
    // no free 10 stones for some reason, get outta here
    tapMiddle(BUY_STONES_EXIT_REGION);
    sleep(1);
}