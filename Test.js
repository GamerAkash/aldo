const {
    // basic gestures
    swipe, sleep, tap, tapMiddle,
    // color & text recognition, polling
    readText, areColorsPresentInRegion, poll
} = require(`${at.rootDir()}/bot-common/bot-common`);

const HOME_MENU_BUTTON_REGION = {x: 66, y: 1232, width: 133, height: 58}

sleep(0.5);

tapMiddle(HOME_MENU_BUTTON_REGION);
