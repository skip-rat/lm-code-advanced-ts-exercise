import { fetchAllUsers } from "../../../api/fetch_all_users";
import { User } from "../../../types/post_types";
import { clear, print, prompt, printNewLine } from "../../../ui/console";

/**
 * prompt to choose a user from the list of available users on the server
 * @param promptText 
 * @returns 
 */
export const chooseUser = async (promptText = '') => {
	clear();
	printNewLine();	

	const users = await fetchAllUsers() as User[];
    let done = false;

    while(!done) {
        print(promptText.length > 0 ? promptText : "😀 Choose an user...");
        users.forEach(user => {
            print(`${user.id} ${user.name}`, false);
        });
        printNewLine();

        const userID = await prompt("Enter a user ID from the above list (or press enter to cancel)");
        if(userID.length === 0) {
            done = true;
        } else {
            const choosenUser = findUser(users, userID);
            if(choosenUser !== undefined) {
                return choosenUser;
            } else {
                print(`Invalid user ID: ${userID}`);
            }
        }
    }

	return undefined;
}

export function findUser(users : User[], userID : string) : User | undefined {
    return users.find(user => user.id === userID);
}