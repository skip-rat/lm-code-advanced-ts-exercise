import { postJsonDataToServer } from '../../../api/post_data';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as con from "../../../ui/console";
import * as uiUtils from "../../../ui/ui_utils";
import { sendMessage } from './send_message';

// mock server request setup
const severBaseURL = 'http://localhost:8080/api/send/';

// default mocked response is success
const server = setupServer(
    rest.post(severBaseURL, (req, res, ctx) => {
        return res(ctx.json({success : true}))
    }),
)

export const sendMessageErrorHandler =
    rest.post(severBaseURL, (req, res, ctx) => {
        return res(ctx.json({error : 'Error sending message'}))
    }
);

// mock out the console functions
jest.mock("../../../ui/console");
jest.mock("../../../ui/ui_utils");

beforeAll(() => {
    server.listen();
    jest.spyOn(con, "clear").mockImplementation(() => {});
    jest.spyOn(con, "print").mockImplementation(() => {});
    jest.spyOn(con, "printNewLine").mockImplementation(() => {});
    jest.spyOn(uiUtils, "printError").mockImplementation(async(error : string) => {});
});

afterEach(() => server.resetHandlers());

afterAll(() => { 
    server.close();
    jest.clearAllMocks(); 
});

test('low level send message to the server with success', async () => {
    // using default mocked success server response from above

    const message = 'hello';
    const response = await postJsonDataToServer<string,boolean>("/api/send/",
		"message", message, "success");

    expect(response).toBe(true);
});

test('low level send a message to the server with error', async () => {
    // mock an error response from the server
    server.use(sendMessageErrorHandler);

    const message = 'hello';
    const response = await postJsonDataToServer<string,boolean>("/api/send/",
		"message", message, "success");

    expect(response).toEqual('Error sending message');
});

test('high level send a message to the server with success', async () => {
    // using default mocked server success response
    // and mocking user input for the message to send
    jest.spyOn(con, "prompt").mockResolvedValue("Hello");
    const response = await sendMessage();

    expect(response).toEqual('MENU');
});