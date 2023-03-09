
/**
 * takes an array of promptForInput functions, runs them and returns an array of the values that
 * were input or undefined if user cancels input at any stage
 * @param promtFuncs 
 * @returns 
 */
export const inputCollector = async (promtFuncs : Array<() => Promise<string | undefined>>)
    : Promise<string[] | undefined> => {

    const inputValues = new Array<string>;
    for(let fn of promtFuncs) {    
        const input = await fn();    
        if(input === undefined) {
            return undefined;           // user cancelled input
        } else {
            inputValues.push(input);
        }
    };

    return inputValues;
}