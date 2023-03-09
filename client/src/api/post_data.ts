import { baseUrl } from "./base_url";

/**
 * POST data T to the server and receives back R or an error string
 * @param url 
 * @param dataName 
 * @param dataValue 
 * @param returnedDataName 
 * @returns 
 */
export async function postJsonDataToServer<T,R>(
	url: string, 
	dataName : string,
	dataValue: T,
	returnedDataName : string) : Promise<R | string> {

	try {
		const result = await fetch(baseUrl + url, {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({ [dataName]: dataValue }),
		});

		const json = await result.json();
		if (json?.[returnedDataName]) {
			return json?.[returnedDataName];
		} else {
			return json?.error;
		}
	} catch (e) {
		console.error(e);
		return "Error: " + e;
	}
}

