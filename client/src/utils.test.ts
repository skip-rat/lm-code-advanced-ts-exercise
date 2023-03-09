import { formatAsCharList, regexCharListFromString, removeChars } from "./utils";

test("formatAsCharList as comma separated string", () => {
	expect(formatAsCharList("")).toBe("");
    expect(formatAsCharList(" ")).toBe("' '");
    expect(formatAsCharList("a")).toBe("'a'");
    expect(formatAsCharList("abc")).toBe("'a','b','c'");
});

test("removeChars from a string", () => {
	expect(removeChars("", "")).toBe("");
    expect(removeChars("abc", "")).toBe("abc");
    expect(removeChars("abc", "c")).toBe("ab");
    expect(removeChars("abcxyz", "axgym")).toBe("bcz");
});

test("regexCharListFromString", () => {
    const reg = regexCharListFromString("");
	expect(reg.source).toBe("[]");

    const reg2 = regexCharListFromString(" ");
	expect(reg2.source).toBe("[ ]");

    const reg3 = regexCharListFromString("-");
	expect(reg3.source).toBe("[\\-]");

    const reg4 = regexCharListFromString("ab-cd");
	expect(reg4.source).toBe("[\ab\\-cd]");
});