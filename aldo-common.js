const { touchDown, touchMove, touchUp, usleep, toast, findImage } = at
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

const ADD_STONES_BUTTON_REGION = {x: 1400, y: 234, width: 39, height: 38};
const EARN_10_STONES_REGION = {x: 929, y: 419, width: 166, height: 53};

const VICTORY_ITEM_SLOT_1 = {x: 808, y: 686, width: 459, height: 44};
const VICTORY_ITEM_SLOT_2 = {x: 808, y: 819, width: 459, height: 44};
const VICTORY_ITEM_SLOT_3 = {x: 808, y: 953, width: 459, height: 44};

function moveRight(timeToMoveInSeconds = null) {
    swipe(1450, 860, 1550, 860, 1, true, 0);
    if(timeToMoveInSeconds != null) {
        sleep(timeToMoveInSeconds);
        stopMovement();
    }
}

function moveLeft(timeToMoveInSeconds = null) {
    swipe(1450, 860, 1350, 860, 1, true, 0);
    if(timeToMoveInSeconds != null) {
        sleep(timeToMoveInSeconds);
        stopMovement();
    }    
}

function moveUp(timeToMoveInSeconds = null) {
    swipe(1450, 860, 1450, 660, 1, true, 0);
    if(timeToMoveInSeconds != null) {
        sleep(timeToMoveInSeconds);
        stopMovement();
    }    
}

function moveDown(timeToMoveInSeconds = null) {
    swipe(1450, 860, 1450, 1060, 1, true, 0);
    if(timeToMoveInSeconds != null) {
        sleep(timeToMoveInSeconds);
        stopMovement();
    }    
}

function stopMovement() {
    touchUp(1, 1, 1);
}

// right vertical bar of M
const EXPLORATION_MENU_M_REGION = {x: 107, y: 1247, width: 5, height: 34};
const EXPLORATION_MENU_M_COLORS = [
    { color: 11973817, x: 0, y: 0 },
    { color: 14869218, x: 0, y: -9 },
    { color: 16777215, x: 0, y: -31 }
];

// if the Menu button is visible then we are able to walk around
// requires that we are motionless for 1 second
function isInExploration() {
    return areColorsPresentInRegion(EXPLORATION_MENU_M_COLORS, EXPLORATION_MENU_M_REGION);
}

const AF_GAUGE_TIP_REGION = {x: 1455, y: 287, width: 16, height: 36};
const AF_GAUGE_TIP_COLORS = [
    { color: 9531457, x: 0, y: 0 },
    { color: 8018472, x: 0, y: -12 },
    { color: 10647857, x: 0, y: -21 }
];

// requires that AF bar is not at 100% glowing, we're not selecting abilities
function isInBattle() {
    return areColorsPresentInRegion(AF_GAUGE_TIP_COLORS, AF_GAUGE_TIP_REGION);
}

const BATTLE_FIRST_UNIT_TOP_BORDER_REGION = {x: 42, y: 1065, width: 159, height: 8};
const BATTLE_FIRST_UNIT_TOP_BORDER_COLORS = [
    { color: 14470812, x: 0, y: 0 },
    { color: 14470812, x: 39, y: 0 },
    { color: 14470812, x: 69, y: 0 }
];

function isPlayerTurnInBattle() {
    // need to use the 1st character in case others are in reserve
    return areColorsPresentInRegion(BATTLE_FIRST_UNIT_TOP_BORDER_COLORS, BATTLE_FIRST_UNIT_TOP_BORDER_REGION);
}

const BATTLE_UNIT_REGIONS = [
    {x: 30, y: 1150, width: 255, height: 194}, {x: 301, y: 1150, width: 255, height: 194}, 
    {x: 571, y: 1150, width: 255, height: 194}, {x: 842, y: 1150, width: 255, height: 194}, 
    {x: 1155, y: 1150, width: 255, height: 194}, {x: 1426, y: 1150, width: 255, height: 194}, 
    {x: 1697, y: 1146, width: 254, height: 198} // Sub move
];

const BATTLE_ABILITY_REGIONS = [
    {x: 44, y: 1021, width: 379, height: 94}, {x: 439, y: 1021, width: 379, height: 94}, 
    {x: 834, y: 1021, width: 379, height: 94}, {x: 1229, y: 1021, width: 379, height: 94},
    {x: 1624, y: 1021, width: 379, height: 94}
];

const BATTLE_ATTACK_REGION = {x: 1741, y: 1053, width: 262, height: 261};

// "Items" in "Items Obtained"
const VICTORY_ITEMS_REGION = {x: 29, y: 246, width: 157, height: 60};
// some white pixels in the I
const VICTORY_ITEMS_COLORS = [
    { color: 16382457, x: 0, y: 0 },
    { color: 13684944, x: 1, y: 32 }
];

function atVictoryScreen() {
    return areColorsPresentInRegion(VICTORY_ITEMS_COLORS, VICTORY_ITEMS_REGION);
}

// unit to use (1-6)
// ability to use (1-5), 1 is usually normal attack, 5 is usually swap
// target (1-7) which unit portrait to click on
function selectAbility(unit, ability, target = null) {
    tapMiddle(BATTLE_UNIT_REGIONS[unit-1]);
    sleep(0.3);
    tapMiddle(BATTLE_ABILITY_REGIONS[ability-1]);
    sleep(0.2);
    if(target != null) {
        tapMiddle(BATTLE_UNIT_REGIONS[target-1]);
        sleep(0.5);
    }
}

function tapAttack() {
    tapMiddle(BATTLE_ATTACK_REGION);
    sleep(0.5);
}

const OBTAINED_CHEST_REGION = {x: 662, y: 218, width: 7, height: 196}
// a tiny sliver of the Obtained window that includes the top and bottom borders and a slice of the O
const OBTAINED_CHEST_COLORS = [
    { color: 11707765, x: 0, y: 0 },
    { color: 16777215, x: 0, y: -83 },
    { color: 11247216, x: 0, y: -182 }
];
function isObtainedDialogOpen() {
    return areColorsPresentInRegion(OBTAINED_CHEST_COLORS, OBTAINED_CHEST_REGION);
}

function checkAndTapObtainedDialog() {
    if(isObtainedDialogOpen()) {
        tapMiddle(OBTAINED_CHEST_REGION);
        sleep(0.5);
    } else {
        alert("Expected to have tapped a chest, aborting");
        at.stop();
    }
}

module.exports = {
    // exploration
    moveUp, moveDown, moveLeft, moveRight, stopMovement, 
    // pre-battle
    isInBattle, isInExploration,
    // battle
    selectAbility, tapAttack, isPlayerTurnInBattle,
    // post-battle
    atVictoryScreen
}