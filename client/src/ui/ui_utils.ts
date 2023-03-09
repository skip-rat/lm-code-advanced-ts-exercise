import { clear, print, prompt } from "./console";

export const promptToReturnToMenu = async () => {
	return await prompt("⌨️ Press [ENTER] to return to the main menu! 🕶️");
}

export const printError = async (error : string) => {
	print('🛑 ' + error, false);
}
