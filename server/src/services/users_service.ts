import { getUsers } from "../database/data_access";
import { User } from "../types/posts.types";


export function getAllUsers(): User[] {
	// in the absence of a true Model layer, our service can simply return a hard-coded array of users
	return getUsers();
}

export function addUser(username : string) : User | string {
	const users = getUsers();
	let user = users.find(cachedUser => 
		cachedUser.name.toLowerCase() === username.toLowerCase()
	);

	if(user !== undefined) {
		return "User already exists";
	} else {
		// for now generate user ID from array size
		const userID = users.length + 1;
		user = { id : userID.toString(), name : username, creationDate : new Date() };
		users.push(user);
		return user;
	}
}
