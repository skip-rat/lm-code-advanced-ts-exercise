import { fetchData } from "./fetch_data";

export async function fetchPost(id : string) {
	return fetchData("/api/posts/" + id);
}
