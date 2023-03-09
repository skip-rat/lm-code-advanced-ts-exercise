import { fetchAllPosts } from "../../../api/fetch_all_posts";
import { clear, print, printNewLine } from "../../../ui/console";
import { Action } from "../../../states/action";
import { promptToReturnToMenu } from "../../../ui/ui_utils";

export const showAllPosts : Action = async () => {
	clear();

	printNewLine();

	print("📨 Fetching posts...");

	const result = await fetchAllPosts();

	print(`🥳 Received ${result.length} posts. Here they are:`);

	console.log(result);

	printNewLine();
	await promptToReturnToMenu();

	return "MENU";
}
