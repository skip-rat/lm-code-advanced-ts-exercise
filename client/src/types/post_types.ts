export type User = {
	id: string;
	name: string;
	creationDate: Date;
};

export type Post = {
	id: string;
	title: string;
	text: string;
	author: User;
};