import * as con from "./console";
import * as uiUtils from "./ui_utils";
import { promptForInput } from "./prompt_for_input";

// mock out the console functions
jest.mock("./console");
jest.mock("./ui_utils");

beforeAll(() => {
    jest.spyOn(con, "clear").mockImplementation(() => {});
    jest.spyOn(con, "print").mockImplementation(() => {});
    jest.spyOn(con, "printNewLine").mockImplementation(() => {});
    jest.spyOn(uiUtils, "printError").mockImplementation(async(error : string) => {});
});

afterAll(() => { jest.clearAllMocks(); });

test('promptForInput expecting string for valid simulated input', async () => {
    // Arrange
    // mock the value a user would enter in the console
	jest.spyOn(con, "prompt").mockResolvedValue("Fred");
    // validator returns undefined if input ok, else error msg
    const validator = jest.fn((value : string) => { return undefined; });

    // Act
    // promptForInput returns a promt func primed to be called
    const promtFunc = await promptForInput("Enter username", validator);
    const result = await promtFunc();

    // Assert
    expect(result).toEqual("Fred");
});

test('promptForInput expecting undefined for cancelled input', async () => {
    // Arrange
    // mock an empty input to simulate the cancel case
	jest.spyOn(con, "prompt").mockResolvedValue("");
    const validator = jest.fn((value : string) => { return undefined; });

    // Act
    // promptForInput returns a promt func
    const promtFunc = await promptForInput("Enter username", validator);
    const result = await promtFunc();

    // Assert
    expect(result).toBe(undefined);
});