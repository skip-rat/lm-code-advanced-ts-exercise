import { getPosts } from "../database/data_access";
import { Post } from "../types/posts.types";

export function getAllPosts(): Post[] {
	return getPosts();
}

export function addPost(post : Post) : Post | string {
	const posts = getPosts();
	// for now generate post ID from array size
	const postID = posts.length + 1;
	post.id = postID.toString();
	posts.push(post);
	return post;
}
