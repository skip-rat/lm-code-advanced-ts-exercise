import * as readline from "node:readline/promises";
import { EOL } from "os";

export function getNewLineChar() {
	return EOL;
}

export function printNewLine() {
	console.log(EOL); // this imports the correct End-Of-Line for either Windows or Unix
}

export function print(str : string, newLine = true) {
	console.log(str);
	if (newLine === true) {
		printNewLine();
	}
}

export function clear(addTopBorder = true) {
	console.clear();
	if (addTopBorder) {
		print("------------------------------------");
	}
}

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export async function prompt(prompt : string) {
	const answer = await reader.question(`${prompt}  > `);
	return answer;
}

export function cleanup() {
	if(reader !== undefined) {	
		reader.close();
	}
}

