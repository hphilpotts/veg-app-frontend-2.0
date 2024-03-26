import { describe, test, expect } from "vitest";
import { xAuth } from "../src/utils/axiosConfig";

const xAuthReturn = xAuth('12345');


describe("xAuth should:", () => {

    test("return an object", () => {
        expect(xAuthReturn).toBeTypeOf('object');
    });

    test("return an object with a headers:[object] key:value pair only", () => {
        expect(xAuthReturn).toHaveProperty('headers');
        expect(Object.keys(xAuthReturn)).toHaveLength(1);
        expect(xAuthReturn.headers).toBeTypeOf('object');
    });

    test("return an object with 'x-auth-token':[token passed in] as the headers value", () => {
        expect(xAuthReturn.headers).toHaveProperty('x-auth-token');
        expect(Object.keys(xAuthReturn.headers)).toHaveLength(1);
        expect(xAuthReturn.headers["x-auth-token"]).toEqual('12345');
    });

});