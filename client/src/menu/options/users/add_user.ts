
import { postJsonDataToServer } from "../../../api/post_data";
import { Action } from "../../../states/action";
import { User } from "../../../types/post_types";
import { print, printNewLine, getNewLineChar } from "../../../ui/console";
import { promptForInput } from "../../../ui/prompt_for_input";
import { promptToReturnToMenu, printError } from "../../../ui/ui_utils";
import { validateUsername, VALID_USERNAME_PROMPT } from "./user_validator";

const ADD_USER_PROMPT = `Enter username (or press enter to cancel)
${getNewLineChar()}(${VALID_USERNAME_PROMPT})`;

export const addUser : Action = async () => {
	const promtFn = await promptForInput(ADD_USER_PROMPT, validateUsername);
	const username = await promtFn();
	if(username === undefined) {
		return "MENU";				// input cancelled
	}

	const result = await postJsonDataToServer<string,User>("/api/users/add",
		"username", username, "user");

	if(typeof result === 'string') {
		printError(`Error: ${result}`);
	} else {
		print(`User added: name:${result.name}, id:${result.id}, date:${result.creationDate}`);
	}

	printNewLine();
	await promptToReturnToMenu();

	return "MENU";
}


