import { State } from "./state";

test('State class set and get state', async () => {
    const state = new State();
    expect(state.get()).toEqual('MENU');

    state.set('ADD_USER');
    expect(state.get()).toEqual('ADD_USER');
});