import { states, StateType } from "./states";

export class State {
	#state : StateType = "MENU";

	get() : StateType {
		return this.#state;
	}

	set(newState : StateType) {
		this.#state = newState;
	}
}
