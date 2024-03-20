import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { cleanup, render, screen } from '@testing-library/react';
import { Home } from "../src/pages/Home";

describe("Home Page should", () => {

    beforeAll(() => {
        render(<Home />);
    });

    test("have a heading role", () => {
        expect(screen.getByRole('heading')).toBeDefined();
    });

    test("have the word 'VegApp' visible", () => {
        expect(screen.getByText(/VegApp/i)).toBeDefined()
    });

});