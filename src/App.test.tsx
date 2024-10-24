import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('String Calculator App', () => {

  test('renders the app correctly with initial components', () => {
    render(<App />);
    const title = screen.getByText(/SimpleCalc/i);
    const button = screen.getByRole('button', { name: /Calculate/i });
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('displays result as 0 for empty input', () => {
    render(<App />);
    const calculateButton = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.click(calculateButton);
    const result = screen.getByDisplayValue(/0/i);
    expect(result).toBeInTheDocument();
  });

  test('calculates sum correctly for "1,2,3"', () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: '1,2,3' } });
    const calculateButton = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.click(calculateButton);
    const result = screen.getByDisplayValue(/6/i);
    expect(result).toBeInTheDocument();
  });

  test('handles newlines as delimiter', () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: '1\n2,3' } });
    const calculateButton = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.click(calculateButton);
    const result = screen.getByDisplayValue(/6/i);
    expect(result).toBeInTheDocument();
  });

  test('shows error for negative numbers', () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: '1,-2,3' } });
    const calculateButton = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.click(calculateButton);
    const errorMessage = screen.getByDisplayValue(/Negative numbers not allowed: -2/i);
    expect(errorMessage).toBeInTheDocument();
  });
});