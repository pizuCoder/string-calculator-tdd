import React, { useState } from 'react';

// Core string calculator logic
const add = (numbers: string): number => {
  // Check for empty string
  if (!numbers) return 0;

  // Replace "/n" with actual newline
  numbers = numbers.replace(/\/n/g, '\n');

  let delimiter = /,|\n/; // Default delimiters: comma or newline

  // Handle custom delimiter
  if (numbers.startsWith("//")) {
    const delimiterEndIndex = numbers.indexOf("\n");
    if (delimiterEndIndex === -1) {
      throw new Error("Invalid input format for custom delimiter.");
    }

    // Extract custom delimiter
    const customDelimiter = numbers.substring(2, delimiterEndIndex).trim();
    if (!customDelimiter) {
      throw new Error("Custom delimiter is missing.");
    }

    // Create regex for any character in the custom delimiter
    delimiter = new RegExp(`[${customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g');
    
    // Update numbers to exclude the delimiter declaration
    numbers = numbers.substring(delimiterEndIndex + 1);
  }

  // Split the numbers string by the defined delimiter (custom or default)
  const numArray = numbers.split(delimiter);

  // Convert each number from string to integer, and check for any negative numbers
  const resultArray = numArray.map(num => {
    const number = parseInt(num, 10);
    if (number < 0) {
      throw new Error(`Negative numbers not allowed: ${number}`);
    }
    return isNaN(number) ? 0 : number;
  });

  // Sum up the valid numbers
  return resultArray.reduce((sum, num) => sum + num, 0);
};

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | string>(0);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      setError(null); // Reset error state before calculation
      const sum = add(inputValue);
      setResult(sum);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>String Calculator</h1>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter numbers (one per line)"
        style={{ padding: '10px', width: '300px', height: '100px', marginRight: '10px' }}
      />
      <button onClick={handleCalculate} style={{ padding: '10px' }}>
        Calculate
      </button>
      
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p style={{ fontSize: '20px', marginTop: '10px' }}>Result: {result}</p>
      )}
    </div>
  );
};

export default App;