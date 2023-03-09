import {
	isPositiveInteger,
	maxLength,
	minLength,
	minValue,
	mustBeNumeric,
	mustEqual,
	mustNotBeNull,
	noNumbers,
	noSpecialChars,
} from './validation_rules';

// 💡 This file tests that all of the ACTUAL validation logic actually works
//    based on project solution:
//    lm-code-testing-react-components-aliens-solution-main

describe('validation_rules: maxLength', () => {
	it('returns an error message if a string is too long', () => {
		const fn = maxLength(2);
		const result = fn('abc');
		expect(result).toBeDefined();
	});

	it('returns undefined if a string is below maxLength', () => {
		const fn = maxLength(2);
		const result = fn('a');
		expect(result).toBeUndefined();
	});

	it('returns undefined if a string is equal to maxLength', () => {
		const fn = maxLength(2);
		const result = fn('ab');
		expect(result).toBeUndefined();
	});

	it('throws an error if a string is not provided', () => {
		const fn = maxLength(2);
		//  💡 TypeScript won't actually let us call this function with an undefined string
		//  (✅ which is good! It means we don't honestly need to test this)
		//  BUT if we really, REALLY wanted to test it, we could check it throws an error like this:
		expect(() => fn(undefined as unknown as string)).toThrow();
	});
});

describe('validation_rules: minLength', () => {
	it('returns an error message if a string is too short', () => {
		const fn = minLength(2);
		const result = fn('a');
		expect(result).toBeDefined();
	});

	it('returns undefined if a string is above minLength', () => {
		const fn = minLength(2);
		const result = fn('abc');
		expect(result).toBeUndefined();
	});

	it('returns undefined if a string is equal to minLength', () => {
		const fn = minLength(2);
		const result = fn('ab');
		expect(result).toBeUndefined();
	});
});

describe('validation_rules: noNumbers', () => {
	it('returns an error message if a string contains numbers', () => {
		const fn = noNumbers();
		const result = fn('76');
		expect(result).toBeDefined();

		const otherResult = fn('ajkh4');
		expect(otherResult).toBeDefined();
	});

	it('returns undefined if a string contains no numbers', () => {
		const fn = noNumbers();
		const result = fn('abc');
		expect(result).toBeUndefined();
	});
});

describe('validation_rules: isPositiveInteger', () => {
	it('returns an false if a string contains non digit chars', () => {
		const fn = isPositiveInteger();
		const values = [ '', ' ', 'a', 'a1', '1b' ];
		values.forEach(str => {
			const result = fn(str);
			expect(result).toBe(false);	
		});				
	});

	it('returns true if a string contains a positive decimal integer', () => {
		const fn = isPositiveInteger();
		const values = [ '1', '123', '999', '4851568' ];
		values.forEach(str => {
			const result = fn(str);
			expect(result).toBe(true);	
		});		
	});
});

describe('validation_rules: noSpecialChars', () => {
	it('returns an error message if a string contains special chars', () => {
		const fn = noSpecialChars();
		const result = fn('!');
		expect(result).toBeDefined();

		const otherResult = fn('ajkh?');
		expect(otherResult).toBeDefined();

		// 💡 If we're being thorough, we probably want to test all the other characters one by one, to be sure...
	});

	it('returns undefined if a string contains no special chars', () => {
		const fn = noSpecialChars();
		const result = fn('abc');
		expect(result).toBeUndefined();
	});
});

describe('validation_rules: allow some special chars', () => {
	it('returns undefined if a string contains non special chars', () => {
		const allowedChars = ' _-"';
		const fn = noSpecialChars(allowedChars);
		const result = fn('abc');
		expect(result).toBeUndefined();

		const otherResult = fn('123');
		expect(otherResult).toBeUndefined();
	});
	
	it('returns an error message if a string contains non-allowed special chars', () => {
		const allowedChars = ' _-"';
		const fn = noSpecialChars(allowedChars);
		const result = fn('!');
		expect(result).toBeDefined();

		const otherResult = fn('ajkh?');
		expect(otherResult).toBeDefined();
	});

	it('returns undefined if a string contains allowed special chars', () => {
		const allowedChars = ' _-"';
		const fn = noSpecialChars(allowedChars);
		const result = fn(allowedChars);
		expect(result).toBeUndefined();

		const otherResult = fn('USER-name "25"');
		expect(otherResult).toBeUndefined();
	});
});

describe('validation_rules: mustBeNumeric', () => {
	it('returns an error message if a string contains non-numeric chars', () => {
		const fn = mustBeNumeric();
		const result = fn('akljgrekjl');
		expect(result).toBeDefined();

		const otherResult = fn('12786218776a');
		expect(otherResult).toBeDefined();
	});

	it('returns undefined if a string contains only numbers', () => {
		const fn = mustBeNumeric();
		const result = fn('123');
		expect(result).toBeUndefined();
	});
});

describe('validation_rules: minValue', () => {
	it('returns an error message if a value is below a minimum', () => {
		const fn = minValue(12);
		const result = fn('11');
		expect(result).toBeDefined();
	});

	it('returns an error message if a value is not a valid number', () => {
		const fn = minValue(12);
		const result = fn('dsgg');
		expect(result).toBeDefined();
	});

	it('returns undefined if a value is above a minimum', () => {
		const fn = minValue(12);
		const result = fn('13');
		expect(result).toBeUndefined();
	});

	it('returns undefined if a value is equal to a minimum', () => {
		const fn = minValue(12);
		const result = fn('12');
		expect(result).toBeUndefined();
	});
});

describe('validation_rules: mustNotBeNull', () => {
	it('returns an error message if a value is null', () => {
		const fn = mustNotBeNull();
		const result = fn(null as unknown as string);
		expect(result).toBeDefined();
	});

	it('returns an error message if a value is undefined', () => {
		const fn = mustNotBeNull();
		const result = fn(undefined as unknown as string);
		expect(result).toBeDefined();
	});

	it('returns no error message if a value is not null', () => {
		const fn = mustNotBeNull();
		const result = fn('dsgg');
		expect(result).toBeUndefined();
	});

	it('returns no error message if a value is empty string', () => {
		const fn = mustNotBeNull();
		const result = fn('');
		expect(result).toBeUndefined();
	});
});

describe('validation_rules: mustEqual', () => {
	it('returns an error message if a value does not equal the desired value', () => {
		const fn = mustEqual('xyz');
		const result = fn('abc');
		expect(result).toBeDefined();
	});

	it('returns no error message if a value does equal the desired value', () => {
		const fn = mustEqual('xyz');
		const result = fn('xyz');
		expect(result).toBeUndefined();
	});
});
