import { inputCollector } from "./input_collector";

test('inputCollector runs functions passed to it and returns their results',
    async () => {

    const nameFunc = jest.fn(async () => { return "Fred"; });
    const numberFunc = jest.fn(async () => { return "123" } );
    const funcArray = [];
    funcArray.push(nameFunc);
    funcArray.push(numberFunc);

    const results = await inputCollector(funcArray);
    expect(results).not.toBe(undefined);
    if(results !== undefined) {
        expect(results.length).toBe(2);
        expect(results[0]).toEqual("Fred");
        expect(results[1]).toEqual("123");
    }
});

test('inputCollector runs functions and returns undefined as cancel state',
    async () => {

    const nameFunc = jest.fn(async () => { return "Fred"; });
    const numberFunc = jest.fn(async () => { return undefined } );
    // second function returns undefined to simulate user cancelling input
    const funcArray = [];
    funcArray.push(nameFunc);
    funcArray.push(numberFunc);

    const results = await inputCollector(funcArray);
    expect(results).toBe(undefined);
});