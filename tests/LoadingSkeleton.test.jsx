import { beforeAll, describe, expect, test } from "vitest";
import { render, screen, toHaveClass } from '@testing-library/react';
import { LoadingSkeleton } from "../src/components/LoadingSkeleton";

describe("LoadingSkeleton component should", () => {

    test("render a div with class: 'MuiStack-root' ", () => {
        const { container } = render(<LoadingSkeleton count={5} />);
        expect(container.getElementsByClassName('MuiStack-root')).toBeDefined();
    });

});