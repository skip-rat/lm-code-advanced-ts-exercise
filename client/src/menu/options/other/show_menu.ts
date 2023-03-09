import { Action } from "../../../states/action"
import { clear, print, printNewLine, prompt } from "../../../ui/console";
import { StateType } from "../../../states/states";

const MENU_ITEMS : [StateType, string][] = [
	['SEND_MESSAGE', "📨 Send Server Message"],
	['SHOW_POSTS',   "✍️  Show all posts"],
	['BROWSE_POSTS', "✍️  Browse posts"],
	['ADD_POST',     "✍️  Add post"],
	['SHOW_USERS',   "😀 Show all users"],
	['ADD_USER',     "😀 Add user"],
	['EXIT',         "🛑 Exit"]
];

export const showMenu : Action = async () => {
	clear();
	print("👋 Welcome to our cool blog browser!");
	MENU_ITEMS.forEach((item, index) => {
		print(`${index}. ${item[1]}`, false);
	});
	printNewLine();

	const result = await prompt("What shall we do? ");
	// use number to lookup StateType for that menu item
	const num = Number.parseInt(result);
	if(num !== undefined && num >= 0 && num < MENU_ITEMS.length) {
		return MENU_ITEMS[num][0];
	}

	return 'UNKNOWN';
}
