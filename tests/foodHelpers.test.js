import { describe, test, expect, beforeEach, vi } from "vitest";
import * as exports from '../src/utils/foodHelpers';
import Axios from "axios";

describe("createNewFoodDocument should", () => {

    beforeEach(() => {
        vi.mock('axios');
    });

    test("make an Axios POST request", () => {
        exports.createNewFoodDocument({ id: 'dummyUserId' });
        expect(Axios.post).toHaveBeenCalledOnce();
        expect(Axios.post).toHaveBeenCalledWith('/api/foods/create', { user: 'dummyUserId' }, { headers: { 'x-auth-token': undefined } });
    });

});