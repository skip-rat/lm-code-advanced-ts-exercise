import { baseUrl } from "./base_url";

export async function fetchData(url : string) {
	try {
		const result = await fetch(baseUrl + url);
		const data = await result.json();
		return data;
	} catch {
		return [];
	}
}