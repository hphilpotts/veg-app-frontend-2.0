import { describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import { PageTitle } from "../src/components/PageTitle";

describe("PageTitle should", () => {

    test("contain title text as expected", () => {
        render(<PageTitle titleText={"expected text"} />);
        expect(screen.getByText(/expected text/i)).toBeDefined();
    });

});