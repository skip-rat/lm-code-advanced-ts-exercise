import { clear, print, printNewLine, prompt } from "../../../ui/console";
import { Action } from "../../../states/action";
import { promptToReturnToMenu } from "../../../ui/ui_utils";
import { CABBAGE_MODE_TRIGGER } from "../other/cabbage";
import { postJsonDataToServer } from "../../../api/post_data";

export const sendMessage : Action = async () => {
	clear();

	const message = await prompt("What message shall we send? (or press enter to cancel) ");
	if(message.length === 0) {
		return "MENU";
	}

	// handle special cases
	if(message === CABBAGE_MODE_TRIGGER) {
		return "CABBAGE_MODE";
	}

	printNewLine();
	print(`📨 Sending message "${message}"...`);

	const success = await postJsonDataToServer<string,boolean>("/api/send/",
		"message", message, "success");

	if (success === true) print("🥳 Message received successfully!");
	else print("😵 Message NOT received.");

	await promptToReturnToMenu();

	return "MENU";
}
