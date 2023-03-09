import { Action } from "../../../states/action"

export const exitAction : Action = async () => {
    exit(0);
	return 'MENU';
}

export function exit(code : number) {
	process.exit(code);
}