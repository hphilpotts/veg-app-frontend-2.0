import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import { Home } from "../src/pages/Home";

describe("Home Page should", () => {

    beforeEach(() => {
        render(<Home />);
    });

    test("have the word VegApp visible", () => {
        expect(screen.getByText(/VegApp/i)).toBeDefined()
    });

});