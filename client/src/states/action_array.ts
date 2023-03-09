import { StateType } from "./states";
import { Action } from "./action";
import { addUser } from "../menu/options/users/add_user";
import { browsePosts } from "../menu/options/posts/browse_posts";
import { cabbage } from "../menu/options/other/cabbage";
import { sendMessage } from "../menu/options/messages/send_message";
import { showAllPosts } from "../menu/options/posts/show_all_posts";
import { showAllUsers } from "../menu/options/users/show_all_users";
import { showMenu } from "../menu/options/other/show_menu";
import { exitAction } from "../menu/options/other/exit";
import { unknownAction } from "../menu/options/other/unknown";
import { addPost } from "../menu/options/posts/add_post";

const actions = new Map<StateType, Action>();

export function setupActions() {
    actions.set('MENU', showMenu);
    actions.set('SEND_MESSAGE', sendMessage);
    actions.set('SHOW_POSTS', showAllPosts);
    actions.set('BROWSE_POSTS', browsePosts);
    actions.set('ADD_POST', addPost);
    actions.set('SHOW_USERS', showAllUsers);
    actions.set('ADD_USER', addUser);
    actions.set('CABBAGE_MODE', cabbage);
    actions.set('UNKNOWN', unknownAction);
    actions.set('EXIT', exitAction);
}

/**
 * 
 * @param state 
 * @returns an Action for a given app state
 */
export function getAction(state : StateType) : Action | undefined {
    let action = actions.get(state);
    return action;
}