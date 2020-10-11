const {
    // basic gestures
    swipe, sleep, tap, tapMiddle,
    // color & text recognition, polling
    readText, areColorsPresentInRegion, poll
} = require(`${at.rootDir()}/bot-common/bot-common`);

const HOME_MENU_BUTTON_REGION = {x: 66, y: 1232, width: 133, height: 58}

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

sleep(0.5);

tapMiddle(HOME_MENU_BUTTON_REGION);
