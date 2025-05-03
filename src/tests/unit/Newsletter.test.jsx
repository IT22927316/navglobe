import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from '../../components/Newsletter';

describe('Newsletter Component', () => {
  test('renders heading, input, and button', () => {
    render(<Newsletter />);
    
    const heading = screen.getByText(/newsletter/i);
    const input = screen.getByPlaceholderText(/enter your email/i);
    const button = screen.getByRole('button', { name: /subscribe/i });

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('allows typing in the email field', () => {
    render(<Newsletter />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });
});
