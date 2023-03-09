import { fetchAllUsers } from "../../../api/fetch_all_users";
import { clear, print, printNewLine } from "../../../ui/console";
import { Action } from "../../../states/action";
import { promptToReturnToMenu } from "../../../ui/ui_utils";

export const showAllUsers : Action = async () => {
	clear();

	printNewLine();

	print("📨 Fetching users...");

	const result = await fetchAllUsers();

	print(`🥳 Received ${result.length} users. Here they are:`);

	console.log(result);

	printNewLine();
	await promptToReturnToMenu();

	return "MENU";
}
