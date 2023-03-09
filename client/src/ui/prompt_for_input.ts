import { clear, prompt } from "./console";
import { printError } from "./ui_utils";

/**
 * returns a functions that prompts user for an item of input until it
 * validates as ok or they enter an empty string to cancel
 * @param promptText 
 * @param validator 
 * @returns promt function that returns the validated string entered
 *          or undefined to cancel the input operation
 */
export const promptForInput = async (
	promptText : string, 
	validator : (value : string) => string | undefined,
	clearConsole = true) => { 

	return async () : Promise<string | undefined> => {
		let error = undefined;
		while(true) {
			if(clearConsole) clear();
			if(error !== undefined) {
				printError(error);
			}
			const username = await prompt(promptText);
			if(username.length === 0) {
				return undefined;		// empty input = cancel
			}

			error = validator(username);
			if(error === undefined) {
				return username;		// undefined error = input ok
			}
		}
	};
};