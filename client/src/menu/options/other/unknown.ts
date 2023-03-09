import { Action } from "../../../states/action"
import { clear, print, printNewLine, prompt } from "../../../ui/console";
import { promptToReturnToMenu } from "../../../ui/ui_utils";

export const unknownAction : Action = async () => {
	clear();
	print("😵 We have entered an unknown state.");
	printNewLine();
	await promptToReturnToMenu();

	return 'MENU';
}