// Problem 1
function reverseNumber(num) {
  // Convert the number to a string
  const numStr = String(num);
  // Reverse the string
  const reversedStr = numStr.split("").reverse().join("");
  // Convert the reversed string back to a number
  return parseInt(reversedStr, 10);
}
console.log(reverseNumber(23124));
// Problem 2
function isPalindrome(str) {
  // Normalize the string: convert to lowercase and remove non-alphanumeric characters
  let normalizedStr = "";
  const lowerCaseStr = str.toLowerCase();
  for (let i = 0; i < lowerCaseStr.length; i++) {
    const char = lowerCaseStr[i];
    // Check if the character is a letter (a-z) or a digit (0-9)
    if ((char >= "a" && char <= "z") || (char >= "0" && char <= "9")) {
      normalizedStr += char;
    }
  }

  // Reverse the normalized string
  const reversedStr = normalizedStr.split("").reverse().join("");
  // Compare the normalized string with its reversed version
  return normalizedStr === reversedStr;
}
console.log(`${isPalindrome("madam")}`);
// Problem 3
function getAllStringCombinations(str) {
  const combinations = [];
  if (str === null || str.length === 0) {
    return combinations; // Return empty array for null or empty string
  }
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      combinations.push(str.substring(i, j));
    }
  }
  return combinations;
}
console.log(
  `Expected: d,do,dog,o,og,g, Actual: ${getAllStringCombinations("dog").join(
    ","
  )}`
);
// Problem 4
function sortStringAlphabetically(str) {
  // Convert the string to an array of characters
  const charArray = str.split("");
  // Sort the array alphabetically
  charArray.sort();
  // Join the array back into a string
  return charArray.join("");
}
console.log(
  `Expected: abeemrstw, Actual: ${sortStringAlphabetically("webmaster")}`
);
// Problem 5
function capitalizeFirstLetterOfEachWord(str) {
  // Split the string into an array of words
  const words = str.split(" ");
  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  // Join the words back into a string
  return capitalizedWords.join(" ");
}
console.log(
  `Expected: The Quick Brown Fox, Actual: ${capitalizeFirstLetterOfEachWord(
    "the quick brown fox"
  )}`
);
