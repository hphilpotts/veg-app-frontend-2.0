import { describe, expect, expectTypeOf, test } from "vitest";
import { getPreviousWeeks } from "../src/utils/weekHelpers";
import dayjs from "dayjs";

const testDate = dayjs('01-01-2012')

describe('getPreviousWeeks should:', () => {

    test('return an array of four dates when one argument passed', () => {
        expect(getPreviousWeeks(testDate).length).toBe(4);
    });

    test('return the specified number of dates when second argument passed', () => {
        expect(getPreviousWeeks(testDate, 4).length).toBe(4);
        expect(getPreviousWeeks(testDate, 1).length).toBe(1);
        expect(getPreviousWeeks(testDate, 10).length).toBe(10);
        expect(getPreviousWeeks(testDate, 0).length).toBe(0);
    });

    test('return an array of dayjs dates', () => {
        const testCall = getPreviousWeeks(testDate);
        expectTypeOf(testCall[0]).toEqualTypeOf("object");
        expect(testCall[0]['$isDayjsObject']).toBe(true);
    });

    test('throw type error if JS Date is passed in', () => {
        expect(() => getPreviousWeeks(new Date)).toThrowError("date.subtract is not a function");
    });

});

