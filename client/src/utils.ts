export function formatAsCharList(str: string) {
	return str
		.split("")
		.map((ch) => "'" + ch + "'")
		.join(",");
}

export function removeChars(str: string, charsToRemove: string) {
	return str
		.split("")
		.filter((ch) => charsToRemove.indexOf(ch) === -1)
		.join("");
}

export function regexCharListFromString(str: string) {
	str = str.replace(/\\/, "\\\\"); // must replace \ first
	str = str.replace(/-/, "\\-");
	str = str.replace(/\[/, "\\[");
	str = str.replace(/\]/, "\\]");
	return new RegExp("[" + str + "]");
}


