import { postJsonDataToServer } from "../../../api/post_data";
import { Action } from "../../../states/action";
import { Post } from "../../../types/post_types";
import { clear, print, printNewLine } from "../../../ui/console";
import { inputCollector } from "../../../ui/input_collector";
import { promptForInput } from "../../../ui/prompt_for_input";
import { printError, promptToReturnToMenu } from "../../../ui/ui_utils";
import { chooseUser } from "../users/choose_user";
import { validatePostText, validatePostTitle } from "./post_validator";

const ADD_POST_TITLE_PROMPT = `Enter post title (4-20 characters) (or press enter to cancel)`;
const ADD_POST_TEXT_PROMPT = `Enter post text (4-100 characters) or press enter to cancel)`;

export const addPost : Action = async () => {	
	clear();

	// promt to choose post author,
	// in a real app would use the current user who is logged in
	// but for now choose from the list of available users
	const user = await chooseUser("Choose post author");
	if(user === undefined) {
		return "MENU";				// user cancelled input
	}

	// promt for post fields
	const titleFn = await promptForInput(ADD_POST_TITLE_PROMPT, validatePostTitle, false);
	const textFn = await promptForInput(ADD_POST_TEXT_PROMPT, validatePostText, false);
	const funcArray = [titleFn,textFn];
	const inputVals = await inputCollector(funcArray);
	if(inputVals === undefined) {
		return "MENU";				// user cancelled input
	}

	const post = { id: '-1', title : inputVals[0], text : inputVals[1], author : user } as Post;
	const result = await postJsonDataToServer<Post,Post>("/api/posts/add",
		"post", post, "post");

	if(typeof result === 'string') {
		printError(`Error: ${result}`);
	} else {
		print(`Post added:`, false);
		print(` Title:  ${result.title}`, false);
		print(` Author: ${result.author.name}`, false);
		print(` Text:   ${result.text}`, false);		
	}

	printNewLine();
	await promptToReturnToMenu();

	return "MENU";
}

