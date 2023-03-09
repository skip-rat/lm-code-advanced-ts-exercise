import { clear, print, printNewLine } from "../../../ui/console";
import { Action } from "../../../states/action";
import { promptToReturnToMenu } from "../../../ui/ui_utils";

export const CABBAGE_MODE_TRIGGER = "engage cabbage mode";

export const cabbage : Action = async () => {
    clear();
    print("🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬", false);
    print("🥬      CABBAGE MODE UNLOCKED     🥬", false);
    print("🥬     Why did you want this?     🥬", false);
    print("🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬🥬", false);
    printNewLine();
    await promptToReturnToMenu();

	return "MENU";
}