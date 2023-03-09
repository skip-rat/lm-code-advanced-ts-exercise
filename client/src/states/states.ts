export const states = [
	"MENU",

	"SEND_MESSAGE",

	"SHOW_POSTS",
	"SHOW_USERS",
	"BROWSE_POSTS",
	"ADD_POST",

	"ADD_USER",
	"CABBAGE_MODE",

	"UNKNOWN",
	"EXIT"
] as const;

export type StateType = typeof states[number]