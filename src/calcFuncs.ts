// Function to extract delimiter and numbers from the input string
const extractDelimiterAndNumbers = (
  input: string
): { delimiter: RegExp; numbers: string } => {
  let delimiter = /,|\n/; // Default delimiters: comma or newline

  // Check for empty string
  if (!input) return { delimiter, numbers: "" };

  // Replace "/n" with actual newline
  input = input.replace(/\/n/g, "\n");

  // Handle custom delimiter
  if (input.startsWith("//")) {
    const delimiterEndIndex = input.indexOf("\n");
    if (delimiterEndIndex === -1) {
      throw new Error("Invalid input format for custom delimiter.");
    }

    // Extract custom delimiter
    const customDelimiter = input.substring(2, delimiterEndIndex).trim();
    if (!customDelimiter) {
      throw new Error("Custom delimiter is missing.");
    }
    // Check if the custom delimiter is a single character
    if (customDelimiter.length !== 1) {
      throw new Error("Custom delimiter must be a single character.");
    }

    // Create regex for any character in the custom delimiter
    delimiter = new RegExp(
      `[${customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`,
      "g"
    );

    // Update numbers to exclude the delimiter declaration
    input = input.substring(delimiterEndIndex + 1);
  }

  return { delimiter, numbers: input };
};

// Function to perform addition on an array of numbers
const addNumbers = (numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0);
};

// Function to perform multiplication on an array of numbers
const multiplyNumbers = (numbers: number[]): number => {
  return numbers.reduce((product, num) => product * num, 1);
};

// Main function that utilizes the above helper functions
export const calculate = (input: any) => {
  const { delimiter, numbers } = extractDelimiterAndNumbers(input);
  const numArray = numbers.split(delimiter);

  const resultArray = numArray.map((num) => {
    const number = parseInt(num, 10);
    if (isNaN(number)) return 0;
    if (number < 0) throw new Error(`Negative numbers not allowed: ${number}`);
    return number;
  });

  try {
    if (input.includes("*")) {
      return multiplyNumbers(resultArray);
    } else {
      return addNumbers(resultArray);
    }
  } catch (error) {
    throw error;
  }
};
