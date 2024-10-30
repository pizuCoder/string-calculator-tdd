export const add = (numbers: string): number => {
    let delmiter2;
    // Check for empty string
    if (!numbers) return 0;
  
    // Replace "/n" with actual newline
    numbers = numbers.replace(/\/n/g, "\n");
    
  
    let delimiter = /,|\n/; // Default delimiters: comma or newline
  const multiplicationDelimiter ="*"
    // Handle custom delimiter
    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf("\n");
      if (delimiterEndIndex === -1) {
        throw new Error("Invalid input format for custom delimiter.");
      }
  
      // Extract custom delimiter
      const customDelimiter = numbers.substring(2, delimiterEndIndex).trim();
      delmiter2 = numbers.substring(2, delimiterEndIndex).trim()
      if (!customDelimiter) {
        throw new Error("Custom delimiter is missing.");
      }
      // Check if the custom delimiter is a single character
      if (customDelimiter.length !== 1) {
        throw new Error("Custom delimiter must be a single character.");
      }
    //   if(customDelimiter === multiplicationDelimiter){

    //   }
      // Create regex for any character in the custom delimiter
      delimiter = new RegExp(
        `[${customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`,
        "g"
      );
  
      // Update numbers to exclude the delimiter declaration
      numbers = numbers.substring(delimiterEndIndex + 1);
    }
  
    // Split the numbers string by the defined delimiter (custom or default)
    const numArray = numbers.split(delimiter);
  
    // Convert each number from string to integer, and check for any negative numbers
    const resultArray = numArray.map((num) => {
      const number = parseInt(num, 10);
      if (number < 0) {
        throw new Error(`Negative numbers not allowed: ${number}`);
      }
      return isNaN(number) ? 0 : number;
    });
    const finalResult = delmiter2 === "*" ? resultArray.reduce((sum, num) => sum * num, 1) : resultArray.reduce((sum, num) => sum + num, 0);
    return finalResult;

    // Sum up the valid numbers
     
  };