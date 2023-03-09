import { fetchData } from "./fetch_data";

export async function fetchAllPosts() {
	return fetchData("/api/posts/all");
}
