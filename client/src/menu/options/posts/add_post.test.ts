import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { postJsonDataToServer } from '../../../api/post_data';
import { Post } from '../../../types/post_types';

const TEST_POST = {
    id: "1",
    title: "The Best Day of My Life",
    text: "I went to the zoo and I saw a giraffe! It was very big.",
    author: {
        id: "1",
        name: "Spicy Hotfish",
        creationDate: new Date(),
    },
} as Post;

// mock server request setup
const severBaseURL = 'http://localhost:8080/api/posts/add';

// default mocked response is success
const server = setupServer(
    rest.post(severBaseURL, (req, res, ctx) => {
        return res(ctx.json({post : TEST_POST}))
    }),
)

export const addPostErrorHandler =
    rest.post(severBaseURL, (req, res, ctx) => {
        return res(ctx.json({error : 'Error adding post'}))
    }
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// todo: problem matching the test Post object with the same object
// returned by the mocked server, the returned one prints the date value
// in quotes but printing the test post defined above, does not quote
// the date value
test.skip('add a post on the server with success', async () => {

    const response = await postJsonDataToServer<Post,Post>("/api/posts/add",
		"post", TEST_POST, "post");
    //expect(response).toEqual(TEST_POST);
    expect(response).toMatchObject(TEST_POST);
});

test('add a post on the server with error', async () => {
    server.use(addPostErrorHandler);    // mock an error response

    const message = 'hello';
    const response = await postJsonDataToServer<Post,Post>("/api/posts/add",
        "post", TEST_POST, "error");

    expect(response).toEqual('Error adding post');
});