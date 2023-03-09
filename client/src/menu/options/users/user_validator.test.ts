import { validateUsername } from "./user_validator";

test("valid String", () => {
    // min/max length
	expect(validateUsername("fred")).toBe(undefined);
	expect(validateUsername("The quick brown fox jumps")).toBe(undefined);

	// valid non alphanumeric chars [' ', '-', '"']
	expect(validateUsername('USER-name "25"')).toBe(undefined);
});

test("invalid String", () => {
    const tooShortError = "longer than";
	const tooLongError = "shorter than";
    const wrongCharsError = "Only special characters";

    // wrong length
	expect(validateUsername("")).toContain(tooShortError);
    expect(validateUsername("abc")).toContain(tooShortError);
	expect(validateUsername("The quick brown fox jumps over the lazy dog")).toContain(tooLongError);

	// ivalid non alphanumeric chars [' ', '-', '"']
	expect(validateUsername('USER-name "#25"')).toContain(wrongCharsError);
});