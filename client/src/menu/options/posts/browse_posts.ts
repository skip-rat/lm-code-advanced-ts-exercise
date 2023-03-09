import { fetchPost } from "../../../api/fetch_post";
import { clear, print, prompt, printNewLine } from "../../../ui/console";
import { Action } from "../../../states/action";
import { promptToReturnToMenu } from "../../../ui/ui_utils";
import { isPositiveInteger } from "../validator/validation_rules";

const POST_ID_PROMPT = "Enter Post ID (0-n) or press enter to cancel";

export const browsePosts : Action = async () => {
	clear();
	let done = false;
	let desiredPostId = "";
	const validatorNumber = isPositiveInteger();
	while(!done) {
		desiredPostId
		// todo could use promptForInput and pass validator func in
		desiredPostId = await prompt(POST_ID_PROMPT);
		if(desiredPostId.length === 0) {
			desiredPostId = "";
			break;		// cancelled
		} else if(validatorNumber(desiredPostId)) {
			done = true;
		} else {
			desiredPostId
			print(`Invalid Post ID ${desiredPostId}`);2
			await prompt("Press enter to continue");
		}
	}

	if(desiredPostId.length > 0) {
		print(`📨 Fetching post "${desiredPostId}...`);

		const result = await fetchPost(desiredPostId);

		print(`🥳 Received post:`);

		console.log(result);

		printNewLine();
		await promptToReturnToMenu();
	}

	return "MENU";
}
