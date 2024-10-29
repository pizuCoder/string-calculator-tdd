# SimpleCalc: A String Calculator with Custom Delimiters

Live Link : [click here](https://string-calculator-tdd-fawn.vercel.app/)

**SimpleCalc** is a React-based calculator that implements a simple yet powerful **String Calculator** algorithm. It allows users to input a string of numbers separated by commas, new lines, or custom delimiters, and returns the sum of those numbers. This project follows the **TDD (Test-Driven Development)** approach and includes robust unit testing using **Jest**.

## Features
- **Basic Number Calculation**: Input numbers separated by commas or new lines to calculate their sum.
- **Custom Delimiters**: Use a custom delimiter by inputting numbers in the format `//[delimiter]\n[numbers]`.
- **Error Handling**: Provides user-friendly error messages for invalid input or negative numbers (e.g., "Negative numbers not allowed").
- **Interactive User Interface**: Built using **Ant Design** components for a sleek and modern UI.
- **User Guidance**: A guided **Tour** feature powered by Ant Design helps users understand how to use the calculator, especially when dealing with custom delimiters.

## How It Works
### Input Format:
1. Enter numbers separated by commas or new lines (e.g., `1,2,3` or `1\n2,3`).
2. To use a custom delimiter, start the input with `//[delimiter]\n[numbers]`. For example: `//*\n1*2*3` would result in `6`.
3. Negative numbers are not allowed and will throw an error (e.g., "Negative numbers not allowed: -2").

### Calculation Rules:
- Numbers are parsed and summed.
- Default delimiters are comma (`,`) and new line (`\n`).
- Custom delimiters are specified by starting the string with `//` followed by the delimiter and a newline.

### Example:
- Input: `//;\n1;2;3`
- Output: `6`
