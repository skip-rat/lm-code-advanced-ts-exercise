import { setBaseUrl } from "./api/base_url";
import { Action } from "./states/action";
import { getAction, setupActions } from "./states/action_array";
import { unknownAction } from "./menu/options/other/unknown";
import { State } from "./states/state";

async function main() {
	// get base url from cmd line args
	// [0] = js entry point
	// [1] = js file to run
	// [2] = --no-warnings
	if(process.argv.length > 4) {
		const domain = process.argv[3];
		const port = process.argv[4];
		setBaseUrl(domain, port);
	}

	setupActions();
	let state = new State();
	let action : Action | undefined;

	while (true) {
		// lookup and run the Action for the current app state
		// Action returns the next state to switch to
		action = getAction(state.get());

		if(action === undefined) {
			const nextState = await unknownAction(); 
			state.set(nextState);
		} else {
			const nextState = await action();
			state.set(nextState);
		}
	}
}

main();
