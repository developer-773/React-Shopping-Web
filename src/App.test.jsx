import { describe, it, expect } from 'vitest';
import {render, screen} from '@testing-library/react';

describe('My simple function', () => {
    it('should return the correct value', () => {
        const myFunction = (x) => x * 2;

        const result = myFunction(4);

        expect(result).toBe(8);
    });
});
// test("Testing", () => {
//     render(<App />)
//     const textElement = screen.getByText(/Hello/i)
//     expect(textElement).toBeInTheDocument()
// })

