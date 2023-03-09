import { maxLength, minLength, applyAndCombineErrors } from "../validator/validation_rules";

export const MIN_TITLE_LEN = 4;
export const MAX_TITLE_LEN = 25;

export const MIN_TEXT_LEN = 4;
export const MAX_TEXT_LEN = 100;

export const validatePostTitle = (title: string) => {
	const titleRules = [
		minLength(MIN_TITLE_LEN),
		maxLength(MAX_TITLE_LEN),
	];

	return applyAndCombineErrors(titleRules, title);
};

export const validatePostText = (text: string) => {
    const textRules = [
		minLength(MIN_TEXT_LEN),
		maxLength(MAX_TEXT_LEN),
	];

	return applyAndCombineErrors(textRules, text);
};