import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";
import * as exports from '../src/utils/foodHelpers';
import axios from "axios";


describe("createNewFoodDocument should", () => {

    const mockUser = { id: 'dummyUserId' };

    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    beforeEach(() => {
        vi.mock('axios');
    });

    afterEach(() => {
        consoleErrorMock.mockReset();
    });

    test("make an Axios POST request as expected given the arguments passed in", () => {
        exports.createNewFoodDocument({ id: 'dummyUserId' });
        expect(axios.post).toHaveBeenCalledOnce();
        expect(axios.post).toHaveBeenCalledWith('/api/foods/create', { user: 'dummyUserId' }, { headers: { 'x-auth-token': undefined } });
    });

    test("return a respose as expected if successful", async () => {
        axios.post.mockResolvedValueOnce({ res: { status: 201 } });
        const response = await exports.createNewFoodDocument(mockUser);
        expect(response).toBeTypeOf('object');
        expect(response).toHaveProperty('res');
        expect(response.res).toHaveProperty('status');
        expect(response.res.status).toBe(201);
    })

    test("log an error to the console if unsuccessful", async () => {
        axios.post.mockRejectedValueOnce(new Error("Error creating new Foods document, please try again later"));
        await exports.createNewFoodDocument(mockUser);
        expect(consoleErrorMock).toHaveBeenCalledOnce();
    });

    test("return an error with expected message if unsuccessful", async () => {
        axios.post.mockRejectedValueOnce(new Error("Error creating new Foods document, please try again later"));
        const response = await exports.createNewFoodDocument(mockUser);
        expect(response).toBeTypeOf('object');
        expect(response).toBeInstanceOf(Error);
        expect(response.message).toBe("Error creating new Foods document, please try again later");
    });

});


describe("getFoods shoud", () => {

    test("make an Axios GET request as expected with one param (user) passed in", () => {
        // TODO - add unit test
    });

    test("make an Axios GET request with the optional category filter if second (category) param passed in", () => {
        // TODO - add unit test
    });

    test("return a response as expected if successful", () => {
        // TODO - add unit test
    });

    test("log an error to the console if unsuccessful", () => {
        // TODO - add unit test
    });

    test("return an error with expected message if unsuccessful", () => {
        // TODO - add unit test
    });

});