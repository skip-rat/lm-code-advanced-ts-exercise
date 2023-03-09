// 
// validation rules based on project solution:
// lm-code-testing-react-components-aliens-solution-main
//

import { formatAsCharList, regexCharListFromString, removeChars } from "../../../utils";

//
export type ValidationFunction = (value: string) => string | undefined;

export const maxLength = (max: number) => {
	return (value: string) =>
		value.length <= max
			? undefined
			: `Must be shorter than ${max} characters.`;
};

export const minLength = (min: number) => {
	return (value: string) =>
		min <= value.length
			? undefined
			: `Must be longer than ${min} characters.`;
};

export const noNumbers = () => {
	const numbers = /[0-9]/;
	return (value: string) =>
		numbers.test(value) ? `No numbers allowed.` : undefined;
};

export const isPositiveInteger = () => {
	const numbers = /[0-9]/;
	return (value: string) =>
		value.length > 0 && 
		value.split('').filter(c => /[0-9]/.test(c) === false).length === 0;
};

/**
 * 
 * @param allowedSpecialChars optional string of any special chars to allow
 * @returns error msg if any 'not allowed special chars' found
 */
export const noSpecialChars = (allowedSpecialChars? : string) => {
	return (value: string) => {
		let specialChars = "`!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?~";
		// remove any allowed special chars from the full list
		if(allowedSpecialChars !== undefined) {
			specialChars = removeChars(specialChars, allowedSpecialChars);
		}
		// this will escape any chars that required escaping
		const regex = regexCharListFromString(specialChars);	
		if(regex.test(value)) {
			if(allowedSpecialChars !== undefined) {
				const chars = formatAsCharList(allowedSpecialChars);
				return 'Only special characters (' + chars + ') allowed';
			}
			return `No special characters allowed.`;
		}		
		return undefined;
	}
};

// https://stackoverflow.com/posts/175787/revisions
function isNumeric(value: string) {
	if (typeof value !== 'string') return false;
	return !isNaN(+value) && !isNaN(parseFloat(value));
}

export const mustBeNumeric = () => {
	return (value: string) =>
		isNumeric(value) ? undefined : 'Must be a number.';
};

export const minValue = (min: number) => {
	return (value: string) => {
		if (isNumeric(value)) {
			const num = Number.parseInt(value);
			return num >= min ? undefined : `Must be at least ${min}`;
		}
		return `Not a valid integer.`;
	};
};

export const mustNotBeNull = () => {
	return (value: string) => {
		return value === null || value === undefined
			? `Must not be null.`
			: undefined;
	};
};

export const mustEqual = (desiredValue: string) => {
	return (value: string) => {
		return value === desiredValue
			? undefined
			: `Must equal "${desiredValue}"`;
	};
};

// 💡 This is just a convenience function to apply all of the rules
export const apply = (rules: ValidationFunction[], value: string) => {
	return (
		rules
			// this passes the value to each rule and builds an array of the results
			.map((r) => r(value))
			// then we filter out any "undefined", i.e. we only keep any error messages
			.filter(Boolean) as string[]
	);
	// because of the wobbly definition of .filter() we end up with an array of "any" 😔
	// but we KNOW it's string[], so we use "as string[]" to retain the type information 🥳
};

/**
 * apply validation rules and combine any errors into a single string, one error per line
 * @param rules
 * @param value 
 * @returns 
 */
export const applyAndCombineErrors = (rules: ValidationFunction[], value: string) => {
	const errors = apply(rules, value);
	if(errors.length > 0) {
		return errors.join('\n');
	} else {
		return undefined;
	}

}