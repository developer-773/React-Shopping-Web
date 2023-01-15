import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import  {Register}  from './Register';

describe('Register component', () => {
    it('should render the input fields', () => {
        render(<Register />);

        const firstNameInput = screen.getByLabelText(/first name/i);
        expect(firstNameInput).toBeInTheDocument();

        const lastNameInput = screen.getByLabelText(/last name/i);
        expect(lastNameInput).toBeInTheDocument();

        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toBeInTheDocument();

        const genderInput = screen.getByLabelText(/gender/i);
        expect(genderInput).toBeInTheDocument();
    });

    it('should validate the form', () => {
        render(<Register />);

        const form = screen.getByRole("form");
        fireEvent.submit(form);

        const firstNameInput = screen.getByLabelText(/first name/i);
        expect(firstNameInput).toHaveAttribute("aria-invalid", "true");

        const lastNameInput = screen.getByLabelText(/last name/i);
        expect(lastNameInput).toHaveAttribute("aria-invalid", "true");

        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toHaveAttribute("aria-invalid", "true");

        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toHaveAttribute("aria-invalid", "true");

        const genderInput = screen.getByLabelText(/gender/i);
        expect(genderInput).toHaveAttribute("aria-invalid", "true");
    });
});
