import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";
import * as exports from '../src/utils/foodHelpers';
import axios from "axios";


describe("createNewFoodDocument should", () => {

    const mockUser = { id: 'dummyUserId' };

    beforeEach(() => {
        vi.mock('axios');
    });

    afterEach(() => {
        vi.resetAllMocks();
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
        const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        axios.post.mockRejectedValueOnce(new Error("Error creating new Foods document, please try again later"));
        await exports.createNewFoodDocument(mockUser);
        expect(consoleErrorMock).toHaveBeenCalledOnce();
        expect(consoleErrorMock).toHaveBeenCalledWith(new Error("Error creating new Foods document, please try again later"));
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

    const mockUser = { id: 'dummyUserId' };

    const mockFoodsData = ['apple', 'banana', 'orange'];

    beforeEach(() => {
        vi.mock('axios');
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("make an Axios GET request as expected with one param (user) passed in", () => {
        exports.getFoods(mockUser);
        expect(axios.get).toHaveBeenCalledOnce();
        expect(axios.get).toHaveBeenCalledWith('/api/foods?user=dummyUserId', { headers: { 'x-auth-token': undefined } });
    });

    test("make an Axios GET request with the optional category filter if second (category) param passed in", () => {
        exports.getFoods(mockUser, 'citrus');
        expect(axios.get).toHaveBeenCalledOnce();
        expect(axios.get).toHaveBeenCalledWith('/api/foods?user=dummyUserId&optionalCategoryFilter=citrus', { headers: { 'x-auth-token': undefined } });
    });

    test("return a response as expected if successful", async () => {
        axios.get.mockResolvedValueOnce({ status: 201, data: mockFoodsData  });
        const response = await exports.getFoods(mockUser);
        expect(response.constructor).toBe(Array);
        expect(response).toHaveLength(3);
        expect(response[0]).toBe('apple');
    });

    test("log an error to the console if unsuccessful", async () => {
        const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        axios.get.mockRejectedValueOnce(new Error("Error retrieving Foods, please try again later"));
        const res = await exports.getFoods(mockUser);
        expect(consoleErrorMock).toHaveBeenCalledOnce();
        expect(consoleErrorMock).toBeCalledWith(new Error("Error retrieving Foods, please try again later"));
    });

    test("return an error with expected message if unsuccessful", async () => {
        axios.get.mockRejectedValueOnce(new Error("Error retrieving Foods, please try again later"));
        const response = await exports.getFoods(mockUser);
        expect(response).toBeTypeOf('object');
        expect(response).toBeInstanceOf(Error);
        expect(response.message).toBe("Error retrieving Foods, please try again later");
    });

});


describe("updateFoodsDocumentRequest should", () => {

    beforeEach(() => {
        vi.mock('axios');
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("make an Axios POST request as expected given the arguments passed in", async () => {
        // todo - unit test
    });

    test("return a response as expected if successful", async () => {
        // todo - unit test
    });

    test("log an error to the console with expected message if unsuccessful", async () => {
        // todo - unit test
    });

    test("return an error as expected if unsuccessful", async () => {

    });

});


describe("getFavouritesRequest should", () => {

    beforeEach(() => {
        vi.mock('axios');
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("make an Axios GET request as expected with the user argument passed in", async () => {
        // todo - unit test
    });

    test("return a response as expected if successful", async () => {
        // todo - unit test
    });

    test("log an error to the console with expected message if unsuccessful", async () => {
        // todo - unit test
    });

    test("return an error as expected if unsuccessful", async () => {

    });

});


describe("updateFavouritesRequest should", () => {

    beforeEach(() => {
        vi.mock('axios');
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("make an Axios GET request as expected with the arguments passed in", async () => {
        // todo - unit test
    });

    test("return a response as expected if successful", async () => {
        // todo - unit test
    });

    test("log an error to the console with expected message if unsuccessful", async () => {
        // todo - unit test
    });

    test("return an error as expected if unsuccessful", async () => {

    });

});