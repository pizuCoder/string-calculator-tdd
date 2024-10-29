import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("String Calculator App", () => {
  test("renders the app correctly with initial components", () => {
    render(<App />);
    const title = screen.getByText(/SimpleCalc/i);
    const button = screen.getByRole("button", { name: /Calculate/i });
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("displays result as 0 for empty input", () => {
    render(<App />);
    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);
    const result = screen.getByDisplayValue(/0/i);
    expect(result).toBeInTheDocument();
  });

  test('calculates sum correctly for "1,2,3"', () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: "1,2,3" } });
    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);
    const result = screen.getByDisplayValue(/6/i);
    expect(result).toBeInTheDocument();
  });

  test("handles newlines as delimiter", () => {
    render(<App />);
    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: "1\n2,3" } });
    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);
    const result = screen.getByDisplayValue(/6/i);
    expect(result).toBeInTheDocument();
  });

  test("shows error for negative numbers in a modal", async () => {
    render(<App />);

    // Get the textarea and input negative numbers
    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: "1,-2,3" } });

    // Find and click the calculate button
    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);

    // Wait for the modal to appear and check for the error message
    const errorMessage = await screen.findByText(
      /Negative numbers not allowed: -2/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("only accepts single character as custom delimiter", async () => {
    render(<App />);

    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: "//**\n1**2,3" } }); // Invalid custom delimiter

    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);

    const errorMessage = await screen.findByText(
      /Custom delimiter must be a single character/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("uses only the custom delimiter when set", () => {
    render(<App />);

    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: "//;\n1;2;3" } }); // Custom delimiter is ';'

    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);

    const result = screen.getByDisplayValue(/6/i); // Should sum up using ';' only
    expect(result).toBeInTheDocument();
  });

  test("displays correct result after an error", async () => {
    render(<App />);

    // Trigger an error with negative number
    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: "1,-2" } });

    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);

    await screen.findByText(/Negative numbers not allowed: -2/i); // Wait for the error message

    // Now provide valid input
    fireEvent.change(textArea, { target: { value: "4,5" } });
    fireEvent.click(calculateButton);

    const result = screen.getByDisplayValue(/9/i); // Should display the correct sum now
    expect(result).toBeInTheDocument();
  });

  test("ignores non-numeric inputs", () => {
    render(<App />);

    const textArea = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(textArea, { target: { value: "1,a,3" } }); // Non-numeric input 'a'

    const calculateButton = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.click(calculateButton);

    const result = screen.getByDisplayValue(/4/i); // Should ignore 'a' and sum 1 + 3
    expect(result).toBeInTheDocument();
  });
});
