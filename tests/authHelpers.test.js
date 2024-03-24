import { describe, test, expect, beforeEach, vi } from "vitest";
import { nullUser, userSignupAttempt } from "../src/utils/authHelpers";
import axios from "axios";


describe("nullUsers should", () => {

    test("not be logged in", () => {
        expect(nullUser.loggedIn).toBeFalsy();
    });

    test("have the name 'Guest'", () => {
        expect(nullUser.name).toEqual('Guest');
    });

    test("have a null user ID", () => {
        expect(nullUser.id).toBeNull();
    });

    test("have a null token", () => {
        expect(nullUser.token).toBeNull();
    });

});

describe("userSignupAttempt should", () => {



    beforeEach(() => {
        vi.mock('axios');
    });

    test("return an AuthAttempt object as expected when successful", async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });
        const response = await userSignupAttempt({ email: 'test123@test.com', username: "test user", password: "password" });
        expect(response).toBeTypeOf('object');
        expect(response).toHaveProperty('successful');
        expect(response).toHaveProperty('message');
        expect(response.successful).toBeTruthy();
        expect(response.message).toEqual("user signed up successfully!");
    });


    test("return an AuthAttempt object as expected when unsuccessful", async () => {

        axios.post.mockResolvedValueOnce({ status: 500 });
        const response = await userSignupAttempt({ email: 'test123@test.com', username: "test user", password: "password" });
        expect(response).toBeTypeOf('object');
        expect(response).toHaveProperty('successful');
        expect(response).toHaveProperty('message');
        expect(response.successful).toBeFalsy();
        expect(response.message).toEqual('unknown error signing up, please try again later');

        axios.post.mockRejectedValueOnce({ response: { data: { message: "error creating user, try again!" }, status: 400 } });
        const response2 = await userSignupAttempt({ email: 'test123@test.com', username: "test user", password: "password" });
        expect(response2.message).toEqual("error creating user, try again!");
        expect(response2.successful).toBeFalsy();

    });

});