import { describe, test, expect } from "vitest";
import { nullUser } from "../src/utils/authHelpers";

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

})