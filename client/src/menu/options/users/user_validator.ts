import { formatAsCharList } from "../../../utils";
import { maxLength, minLength, noSpecialChars, applyAndCombineErrors } from "../validator/validation_rules";

export const MIN_LEN = 4;
export const MAX_LEN = 25;
export const VALID_CHARS = '_-"';

export const VALID_USERNAME_PROMPT =
`${MIN_LEN}-${MAX_LEN} chars, alphanumeric and ${formatAsCharList(VALID_CHARS)} only`;

export const validateUsername = (value: string) => {
	const rules = [
		minLength(MIN_LEN),
		maxLength(MAX_LEN),
		noSpecialChars(VALID_CHARS),
	];

	return applyAndCombineErrors(rules, value);
};
