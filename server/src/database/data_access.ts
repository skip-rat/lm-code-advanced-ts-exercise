/**
 * provides simple in memory data storage
 */
import * as userStore from './user_store';
import * as postsStore from './posts_store';

export function setupData() {
    userStore.setupUsers();							// must setup users first
	postsStore.setupPosts(userStore.getUsers());
}

export function getUsers() {
    return userStore.getUsers();
}

export function getPosts() {
    return postsStore.getPosts();
}
