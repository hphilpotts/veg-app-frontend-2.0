import { beforeAll, describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import { PageTitle } from "../src/components/PageTitle";

describe("PageTitle should", () => {

    beforeAll(() => {
        render(<PageTitle titleText={"expected text"} />);
    });

    test("contain title text as expected", () => {
        expect(screen.getByText(/expected text/i)).toBeDefined();
    });

    test("contain an h4 element", () => {
        expect(screen.getByRole('heading', {level: 4})).toBeDefined();
    });

});