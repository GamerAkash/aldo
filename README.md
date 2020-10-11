# aldo
**A**ds? **L**et's **D**ecline, **O**bviously
Set of scripts that automates the daily ad watching in a certain gacha game. Someday, perhaps also automate grinding.

## Requirements
* Jailbroken iOS device with resolution 1536 x 2048: iPad generations 3-6.
* The [Autotouch](https://docs.autotouch.net/) app. Demo will timeout after 1 minute so you need to purchase a license.
    * Be able to figure out how to copy the scripts to your device. I use [WinSCP](https://winscp.net/eng/index.php) and enable WebDAV on Autotouch.
* You need to be able to program Javascript. You need to read much of the code to understand what it's doing so you can modify it for your own needs. Much of it won't work out of the box - you need to tell it which abilities to use on which units.
* You need to be ok with getting banned and/or the script running amok. It has some safety checks but theoretically if the right sequence of taps happens, it can do horrible things like: gamble your stones on a horrible banner, eat those sandwiches from Feinne you've been saving for a year, etc. I treat it like I would a self-driving car. It's a convenience feature but I take full responsibility if I take my hands off the wheel and it gets me into trouble.

## Disclaimers
* <span style="color:red">**You may get banned for using this.**</span>
    * Why doesn't this bother me? This game is not worth the time if I have to manually grind all this crap and watch the damn ads. If the developer wants to ban a paying customer who isn't gaining any in-game advantage, so be it. I have better things to do than "work hard" on a mobile game.
* This has only been tested on an jailbroken iPad 6th gen with resolution 1536 x 2048
    * Requires the autotouch app (which requires jailbreak)
    * These scripts will likely work on other iOS devices with the exact same resolution: iPad 3rd gen - 5th gen
    * These scripts will almost certainly not work on other resolutions due to the fact that much of the logic depends on exact pixel matching. This presents two problems:
        * The coordinates of UI elements will change. This probably wouldn't be too hard to work around by having a translation layer to abstract the logic from the exact pixel coordinates.
        * The game upsamples/downsamples its source images as necessary to render on screen, so if the device resolution changes then many pixel's colors will change as neighboring pixels get blended differently. This is difficult to work around. You would need to sample pixels from the same screens by hand for a different resolution.
* I do this for myself and don't have time to do tech support. I want to help humanity by letting other players enjoy the game without the mind-numbing tedium, but my altruism only goes so far.

## Ad watching
* Watches as many of the 5 daily ads as are available, then watch the ad in the "Buy Chronos" screen
* Uses the X detection algorithm I implemented for my other game's bot (FFBE) and published in the [bot-common](https://github.com/ratbirdmonger/bot-common) repo.
* Because the state of ads on AE is very new, there will be cases in the future that aren't handled properly. I will fix them as they happen on my device.

## To do
* Watch the login ad and continue on to watch the rest of the ads
* Another Dungeon farming
* Currency farming for episodes

## Won't do
* Fishing - someone else already automated it, also the rewards aren't interesting enough to me for the amount of work that automation would require.