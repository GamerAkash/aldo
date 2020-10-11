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
const AD_WATCH_VIDEO_REGION = {x: 1072, y: 1099, width: 356, height: 134};
const AD_CONFIRM_REWARD_OK_REGION = {x: 859, y: 993, width: 337, height: 92};
const AD_APP_STORE_DONE_REGION = {x: 350, y: 77, width: 89, height: 37};

// default location in Spacetime Rift, Blue door 
const DEFAULT_BANG_REGION = {x: 964, y: 383, width: 120, height: 119};
const WORLD_MAP_ANTIQ_REGION = {x: 66, y: 289, width: 144, height: 196};
const WORLD_MAP_PRES_REGION = {x: 231, y: 277, width: 179, height: 211};
const WORLD_MAP_FUT_REGION = {x: 447, y: 254, width: 147, height: 228};
const WORLD_MAP_QUESTION_REGION = {x: 627, y: 261, width: 179, height: 195};
const AD_FUT_MAP_INDUSTRIAL_RUINS_REGION = {x: 849, y: 776, width: 357, height: 47};

const AD_HARD_REGION = {x: 1090, y: 540, width: 874, height: 123};
const AD_HARD_KEYS_REGION = {x: 1252, y: 1258, width: 145, height: 36};

const AD_VERY_HARD_REGION = {x: 1090, y: 696, width: 874, height: 123};
const AD_VERY_HARD_KEYS_REGION = {x: 1642, y: 1258, width: 145, height: 36};

const AD_MOVE_REGION = {x: 1083, y: 1172, width: 340, height: 92};

const AD_TOP_LEFT_REGION = {x: 0, y: 0, width: 120, height: 120};
const AD_TOP_RIGHT_REGION = {x: 1928, y: 0, width: 120, height: 120};

const AD_CHEST_BUTTON = {x: 1819, y: 1171, width: 132, height: 126};
const AD_CONFIRM_REWARD_OK_BUTTON = {x: 823, y: 973, width: 402, height: 133};

sleep(0.5);

tapMiddle(HOME_MENU_BUTTON_REGION);
sleep(1);
tapMiddle(MAIN_MENU_AD_BUTTON_REGION);
sleep(1.5);
tapMiddle(AD_WATCH_VIDEO_REGION);
sleep(55);

if(readText(AD_APP_STORE_DONE_REGION) == "Done") {
    // it was an app store ad, click on the Done button
    tapMiddle(AD_APP_STORE_DONE_REGION);
} else {
    // look for an X button in the top corners
    var regions = [AD_TOP_LEFT_REGION, AD_TOP_RIGHT_REGION];
    regionBaseMaps = [getBaseMapForRegion(regions[0]), getBaseMapForRegion(regions[1])];
    result = findXButton(regionBaseMaps);
    
    if(result.score <= 0) {
        alert("Unable to find X ad, stopping script");
        at.stop();
    } else {
        tap(regions[result.n].x + result.x, regions[result.n].y + result.y);
    }

}
sleep(3);
tapMiddle(AD_CHEST_BUTTON);
sleep(1);
tapMiddle(AD_CONFIRM_REWARD_OK_BUTTON);

// TODO hook this up to a loop and detect when we're out of ads