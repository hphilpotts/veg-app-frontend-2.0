import { afterEach, beforeEach, describe, expect, expectTypeOf, test, vi } from "vitest";
import { createNewWeekDocument, ProgressData, evaluateCurrentWeek, getPreviousWeeks, combineAllFoods } from "../src/utils/weekHelpers";
import axios from "axios";
import dayjs from "dayjs";


const testWeekData = {
    _id: "abc1234",
    user: "ja50n0bj3ct5",
    monday: ["oats"],
    tuesday: ["oats"],
    wednesday: ["oranges"],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    weekCommencing: "2024-03-11T00:00:00.000Z",
    createdAt: "2024-03-11T00:15:59.027Z",
    updatedAt: "2024-03-11T00:18:44.894Z",
    __v: 1
};

const testDate = dayjs(testWeekData.weekCommencing);

describe("createNewWeekDocument should", () => {

    beforeEach(() => {
        vi.mock('axios');
    });

    test("return mocked response data", async () => {
        axios.post.mockResolvedValueOnce({ status: 201, message: "New Week added successfully!" });
        const res = await createNewWeekDocument({ id: testWeekData._id }, testDate);
        expect(res.status).toBe(201);
        expect(res.message).toBe("New Week added successfully!");
    })

    test("return error response if request fails", async () => {
        axios.post.mockRejectedValueOnce(new Error("axios request fail message"));
        const errorRes = await createNewWeekDocument({ id: testWeekData._id }, testDate);
        expect(errorRes).toBeInstanceOf(Error);
        expect(errorRes.message).toBe("axios request fail message");
    });

});


// todo - getWeekDocument tests


describe('ProgressData objects should:', () => {

    const testAllFoodsArray = ['apple', 'banana', 'carrot', 'banana'];
    const TestProgressData = new ProgressData(testAllFoodsArray);

    test('be able to be contsructed with one or two arguments', () => {
        const TwoArgumentProgressData = new ProgressData(testAllFoodsArray, 31);
        expect(TestProgressData).toBeInstanceOf(ProgressData);
        expect(TwoArgumentProgressData).toBeInstanceOf(ProgressData);
    });

    test('have an allFoods property as expected', () => {
        expect(TestProgressData.allFoods[0]).toBe('apple');
        expect(TestProgressData.allFoods).toHaveLength(4);
    });

    test('have a uniqueFoods property as expected', () => {
        expect(TestProgressData.uniqueFoods[2]).toBe('carrot');
        expect(TestProgressData.uniqueFoods).toHaveLength(3);
    });

    test('have a foodsRemaining property that defaults to a target of 30 unique foods', () => {
        expect(TestProgressData.foodsRemaining).toBe(27);
    });

    test('have a foodsRemaining property that can be overriden with a second argument', () => {
        const TargetOfTenProgressData = new ProgressData(testAllFoodsArray, 10);
        expect(TargetOfTenProgressData.foodsRemaining).toBe(7);
    });

    test('have getters that return as expected', () => {
        expect(TestProgressData.allFoodsCount).toBe(4);
        expect(TestProgressData.uniqueFoodsCount).toBe(3);
    });

});


describe('evaluateCurrentWeek should:', () => {

    test('exit by return if no weekData id passed in', () => {
        expect(evaluateCurrentWeek({})).toBeUndefined();
        expect(evaluateCurrentWeek({ prop: 'data' })).toBeUndefined();
        expect(evaluateCurrentWeek({ prop: 'data', id: null })).toBeUndefined();
    });

    test('return a valid and complete ProgressData object from valid weekData', () => {
        const testOutput = evaluateCurrentWeek(testWeekData);
        expect(testOutput, "Hello World").toBeInstanceOf(ProgressData);
        expect(testOutput.allFoodsCount).toBe(3);
        expect(testOutput.foodsRemaining).toBe(28);
    });

});


// todo - evaluatePastWeeks test


describe('getPreviousWeeks should:', () => {

    const testCall = getPreviousWeeks(testDate);

    test('return an array of four dates when one argument passed', () => {
        expect(getPreviousWeeks(testDate)).toHaveLength(4);
    });

    test('return the specified number of dates when second argument passed', () => {
        expect(getPreviousWeeks(testDate, 4)).toHaveLength(4);
        expect(getPreviousWeeks(testDate, 1)).toHaveLength(1);
        expect(getPreviousWeeks(testDate, 10)).toHaveLength(10);
        expect(getPreviousWeeks(testDate, 0)).toHaveLength(0);
    });

    test('return an array of dayjs objects', () => {
        expectTypeOf(testCall[0]).toEqualTypeOf("object");
        expect(testCall[0]['$isDayjsObject']).toBeTruthy();
        expect(testCall.constructor).toBe(Array);
    });

    test('return dates in chronological order', () => {
        expect(testCall[0].isBefore(testCall[1])).toBeTruthy();
        expect(testCall[3].isAfter(testCall[2])).toBeTruthy();
        expect(testCall[0].isAfter(testCall[3])).toBeFalsy();
    });

    test('return dates one week apart', () => {
        expect(testCall[3].subtract(7, 'd').isSame(testCall[2])).toBeTruthy();
        expect(testCall[0].add(7, 'd').isSame(testCall[1])).toBeTruthy();
    });

    test('return an array of dates ending the week before the input date', () => {
        const mondayOfInputWeek = testDate.startOf('week').add(1, 'd');
        expect(testCall[3].add(7, 'd').isSame(mondayOfInputWeek)).toBeTruthy();
    });

    test('return an array of dates which are Mondays', () => {
        const testCall2 = getPreviousWeeks(dayjs('01-02-2012'));
        const testCall3 = getPreviousWeeks(dayjs('01-05-2012'));
        expect(testCall[0].day()).toBe(1);
        expect(testCall[3].day()).toBe(1);
        expect(testCall2[0].day()).toBe(1);
        expect(testCall2[3].day()).toBe(1);
        expect(testCall3[0].day()).toBe(1);
        expect(testCall3[3].day()).toBe(1);
    });

    test('return dates which are set to midnight', () => {
        expect(testCall[0].hour()).toBe(0);
        expect(testCall[0].minute()).toBe(0);
        expect(testCall[0].second()).toBe(0);
        expect(testCall[0].millisecond()).toBe(0);
        expect(testCall[0].isSame(testCall[0].startOf('day'))).toBeTruthy();
    });

    test('throw type error if JS Date is passed in', () => {
        expect(() => getPreviousWeeks(new Date)).toThrowError("date.startOf is not a function");
    });

});


describe('combineAllFoods shoud:', () => {

    const testCall = combineAllFoods(testWeekData);

    test('return an array', () => {
        expect(testCall.constructor).toBe(Array);
        expect(combineAllFoods({}).constructor).toBe(Array);
    });

    test('return an array of strings', () => {
        const isTypeString = element => typeof element === 'string';
        expect(testCall.every(isTypeString)).toBeTruthy();
    });

    test('return an array of expected length', () => {
        expect(testCall).toHaveLength(3);
    });

    test('filter properties from weekData which are not <day>: [<foodItem>]', () => {
        expect(testCall).not.toContain(testWeekData._id);
        expect(testCall).not.toContain(testWeekData.user);
        expect(testCall).not.toContain(testWeekData.weekCommencing);
        expect(testCall).not.toContain(testWeekData.createdAt);
        expect(testCall).not.toContain(testWeekData.updatedAt);
        expect(testCall).not.toContain(testWeekData.__v);
    });

    test('return an array with expected elements', () => {
        expect(testCall).toContain('oats');
        expect(testCall).toContain('oranges');
        expect(testCall[0]).toBe('oats');
        expect(testCall[1]).toBe('oats');
        expect(testCall[2]).toBe('oranges');
    });

});