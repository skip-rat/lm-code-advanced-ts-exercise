import { fetchData } from "./fetch_data";

export async function fetchAllUsers() {
	return fetchData("/api/users/all");
}
