import { User } from "../types/posts.types";

const users : User[] = [];

export const userUnknown = {
    id: "1",
    name: "Spicy Hotfish",
    creationDate: new Date()
};

export function setupUsers() {
	if(users.length > 0) {
		return;
	};

	users.push(...[
		{
			id: "1",
			name: "Spicy Hotfish",
			creationDate: new Date(),
		},
		{
			id: "2",
			name: "Sally-Anne Writerperson",
			creationDate: new Date(),
		},
		{
			id: "3",
			name: "Jimmy Alias",
			creationDate: new Date(),
		},
		{
			id: "4",
			name: 'Steve "The Hoop" Hooper',
			creationDate: new Date(),
		},
	]);
}

export function getUsers() {
    return users;
}

export function getRandomUser(users : User[]) {
    const index = random(0, users.length-1);
    if(index >= 0 && index < users.length) {
        return users[index];
    }
    return userUnknown;
}

export function random(min : number, max : number) {
    return Math.floor(Math.random() * max) + min;
}