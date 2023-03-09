import * as console from "./console";
import { promptForInput } from "./prompt_for_input";
import { promptToReturnToMenu } from "./ui_utils";

jest.mock("./console");

afterEach(() => { jest.clearAllMocks(); });

test('promptToReturnToMenu', async () => {
    // Arrange
    // mock the value a user would enter in the console
	jest.spyOn(console, "prompt").mockResolvedValue("");

    // Act
    // promptForInput returns a promt func
    const result = await promptToReturnToMenu();

    // Assert
    // expecting whatever user entered at the promt    
    expect(result).not.toBe(undefined);
});