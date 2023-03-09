import { sendMessage } from "../menu/options/messages/send_message";
import { showMenu } from "../menu/options/other/show_menu";
import { addPost } from "../menu/options/posts/add_post";
import { addUser } from "../menu/options/users/add_user";
import { getAction, setupActions } from "./action_array";

// this hangs when run on it's own (Jest not exiting)
// and shows "A worker process has failed to exit gracefully..."
// warning when ran with the other tests and is force exited
test('get an Action from a StateType', async () => {
    setupActions();

    const action = getAction("MENU");
    expect(action).toBe(showMenu);

    const action2 = getAction("SEND_MESSAGE");
    expect(action2).toBe(sendMessage);

    const action3 = getAction("ADD_POST");
    expect(action3).toBe(addPost);

    const action4 = getAction("ADD_USER");
    expect(action4).toBe(addUser);
});