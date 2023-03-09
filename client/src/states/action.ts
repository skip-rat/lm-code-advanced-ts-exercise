import { StateType } from "./states";

/**
 * perform the action for a particular state
 * @returns the next state to switch to after the current one
 */
export interface Action {
    (): Promise<StateType>;
}