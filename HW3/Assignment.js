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
// Problem 6
function findLongestWord(str) {
  const words = str.split(" ");
  let longestWord = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  return longestWord;
}
console.log(
  `Expected: Development, Actual: ${findLongestWord(
    "Web Development Tutorial"
  )}`
);
// Problem 7
function countVowels(str) {
  const vowels = "aeiou";
  let count = 0;
  const lowerCaseStr = str.toLowerCase();
  for (let i = 0; i < lowerCaseStr.length; i++) {
    if (vowels.includes(lowerCaseStr[i])) {
      count++;
    }
  }
  return count;
}
console.log(`Expected: 5, Actual: ${countVowels("The quick brown fox")}`); // o i o o = 4, e u o o = 4. Actual: e,u,i,o,o = 5
// Problem 8
function isPrime(num) {
  if (num === null || typeof num !== "number" || num <= 1) {
    // Primes are greater than 1
    return false;
  }
  if (num <= 3) {
    // 2 and 3 are prime
    return true;
  }
  if (num % 2 === 0 || num % 3 === 0) {
    // Eliminate multiples of 2 and 3
    return false;
  }
  // Check from 5 up to sqrt(num)
  // Primes are of the form 6k +/- 1
  for (let i = 5; i * i <= num; i = i + 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}
console.log(`Expected: true, Actual: ${isPrime(2)}`);
// Problem 9
function getType(arg) {
  return typeof arg;
}
console.log(`Expected: number, Actual: ${getType(123)}`);
// Problem 10
function createIdentityMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = []; // Initialize new row
    for (let j = 0; j < n; j++) {
      if (i === j) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
}
console.log(
  `Expected: [[1,0,0],[0,1,0],[0,0,1]], Actual: ${JSON.stringify(
    createIdentityMatrix(3)
  )}`
);
// Problem 11
function findSecondLowestGreatest(arr) {
  // Create a unique sorted array
  const numbers = arr.filter((num) => typeof num === "number" && !isNaN(num));

  const uniqueSortedArr = [...new Set(numbers)].sort((a, b) => a - b);

  if (uniqueSortedArr.length < 2) {
    return "Array must contain at least two unique numbers.";
  }
  return [uniqueSortedArr[1], uniqueSortedArr[uniqueSortedArr.length - 2]];
}
console.log(
  `Expected: 2,4, Actual: ${findSecondLowestGreatest([1, 2, 3, 4, 5])}`
);
// Problem 12
function isPerfectNumber(num) {
  if (
    num === null ||
    typeof num !== "number" ||
    !Number.isInteger(num) ||
    num <= 0
  ) {
    return false; // Perfect numbers are positive integers
  }
  let sumOfDivisors = 0;
  for (let i = 1; i <= num / 2; i++) {
    // Divisors only go up to num/2
    if (num % i === 0) {
      sumOfDivisors += i;
    }
  }
  return sumOfDivisors === num && num !== 0; // Ensure num is not 0, though <=0 check handles it
}
console.log(`Expected: true, Actual: ${isPerfectNumber(6)}`);
// Problem 13
function getFactors(num) {
  if (
    num === null ||
    typeof num !== "number" ||
    !Number.isInteger(num) ||
    num <= 0
  ) {
    return "Input must be a positive integer.";
  }
  const factors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}
console.log(`Expected: 1,2,3,4,6,12, Actual: ${getFactors(12)}`);
// Problem 14
function amountToCoins(amount, coins) {
  const sortedCoins = [...coins].sort((a, b) => b - a);
  const resultCoins = [];
  let remainingAmount = amount;

  for (const coin of sortedCoins) {
    while (remainingAmount >= coin) {
      resultCoins.push(coin);
      remainingAmount -= coin;
    }
  }
  if (remainingAmount > 0) {
  }
  return resultCoins;
}
console.log(
  `Expected: 25,10,10,1, Actual: ${amountToCoins(46, [25, 10, 5, 2, 1])}`
);
// Problem 15
function power(base, exponent) {
  if (!Number.isInteger(exponent)) return "Exponent must be an integer";
  if (exponent === 0) return 1;
  if (exponent < 0) return 1 / power(base, -exponent);
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }
  return result;
}
console.log(`Expected: 8, Actual: ${power(2, 3)}`);
// Problem 16
function extractUniqueChars(str) {
  let uniqueStr = "";
  const seenChars = new Set();
  for (const char of str) {
    if (!seenChars.has(char)) {
      seenChars.add(char);
      uniqueStr += char;
    }
  }
  return uniqueStr;
}
console.log(
  `Expected: thequickbrownfxjmpsvlazydg, Actual: ${extractUniqueChars(
    "thequickbrownfoxjumpsoverthelazydog"
  )}`
);
// Problem 17
function countLetterOccurrences(str) {
  const occurrences = {};
  const lowerCaseStr = str.toLowerCase();
  for (const char of lowerCaseStr) {
    // Only count letters a-z
    if (char >= "a" && char <= "z") {
      occurrences[char] = (occurrences[char] || 0) + 1;
    }
  }
  return occurrences;
}
console.log(
  `Expected: {h:1, e:1, l:3, o:2, w:1, r:1, d:1}, Actual: ${JSON.stringify(
    countLetterOccurrences("Hello World")
  )}`
);
// Problem 18
function binarySearch(sortedArr, target) {
  if (!Array.isArray(sortedArr) || sortedArr.some(isNaN)) {
    return "Input must be a sorted array of numbers.";
  }
  if (typeof target !== "number") {
    return "Target must be a number.";
  }

  let low = 0;
  let high = sortedArr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = sortedArr[mid];

    if (guess === target) {
      return mid; // Target found
    } else if (guess > target) {
      high = mid - 1; // Guess was too high
    } else {
      low = mid + 1; // Guess was too low
    }
  }
  return -1; // Target not found
}
console.log(`Expected: 3, Actual: ${binarySearch([1, 2, 3, 4, 5, 6], 4)}`);

// Problem 19
function getElementsLargerThan(arr, threshold) {
  if (!Array.isArray(arr) || arr.some((el) => typeof el !== "number")) {
    return "Input must be an array of numbers.";
  }
  if (typeof threshold !== "number") {
    return "Threshold must be a number.";
  }
  return arr.filter((element) => element > threshold);
}
console.log(
  `Expected: 15,20, Actual: ${getElementsLargerThan([1, 5, 10, 15, 20], 10)}`
);
// Problem 20
function generateRandomStringId(length) {
  const charList =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charList.length);
    result += charList.charAt(randomIndex);
  }
  return result;
}
const id1 = generateRandomStringId(10);
console.log(
  `Expected: (string of length 10), Actual: ${id1} (length: ${id1.length})`
);
// Problem 21
function getSubsetsOfLength(arr, length) {
  if (length === 0) {
    return [[]]; // One subset: the empty set
  }
  if (length > arr.length) {
    return []; // Not possible to form subsets longer than the array itself
  }

  const result = [];
  function findCombinations(startIndex, currentCombination) {
    if (currentCombination.length === length) {
      result.push([...currentCombination]); // Add a copy
      return;
    }
    if (startIndex >= arr.length) {
      return;
    }

    currentCombination.push(arr[startIndex]);
    findCombinations(startIndex + 1, currentCombination);

    currentCombination.pop();
    findCombinations(startIndex + 1, currentCombination);
  }

  findCombinations(0, []);
  return result;
}
// Problem 21
function getSubsetsOfLength(arr, length) {
  if (!Array.isArray(arr)) {
    return "Input must be an array.";
  }
  if (typeof length !== "number" || !Number.isInteger(length) || length < 0) {
    return "Length must be a non-negative integer.";
  }
  if (length > arr.length) {
    return []; // Not possible to form subsets longer than the array itself
  }
  if (length === 0) {
    return [[]]; // One subset: the empty set
  }

  const result = [];

  if (length === 2) {
    if (arr.length < 2) return []; // Not enough elements for a pair
    for (let i = 1; i < arr.length; i++) {
      // arr[i] is the first element of the pair
      for (let j = 0; j < i; j++) {
        // arr[j] is the second element of the pair
        result.push([arr[i], arr[j]]);
      }
    }
    return result;
  } else {
    function findCombinations(startIndex, currentCombination) {
      // Base case: current combination is the desired length
      if (currentCombination.length === length) {
        result.push([...currentCombination]); // Add a copy
        return;
      }

      for (let i = startIndex; i < arr.length; i++) {
        if (arr.length - i < length - currentCombination.length) {
          break;
        }

        currentCombination.push(arr[i]);
        findCombinations(i + 1, currentCombination); // Next element must be from index i + 1
        currentCombination.pop();
      }
    }
    findCombinations(0, []);
    return result;
  }
}
console.log(
  `Expected: [[2,1],[3,1],[3,2]], Actual: ${JSON.stringify(
    getSubsetsOfLength([1, 2, 3], 2)
  )}`
);
// Problem 22
function countLetterInString(str, letter) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === letter) {
      count++;
    }
  }
  return count;
}
console.log(
  `Expected: 3, Actual: ${countLetterInString("microsoft.com", "o")}`
);
// Problem 23
function findFirstNotRepeatedChar(str) {
  const charCounts = {};
  // First pass: count character frequencies
  for (const char of str) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  // Second pass: find the first character with a count of 1
  for (const char of str) {
    if (charCounts[char] === 1) {
      return char;
    }
  }
  return "";
}
console.log(`Expected: e, Actual: ${findFirstNotRepeatedChar("abacddbec")}`);
// Problem 24
function bubbleSortDescending(arr) {
  const n = arr.length;
  let swapped;
  // const newArr = [...arr];
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      // For descending order, swap if left element is smaller than right element
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
        swapped = true;
      }
    }
    // If no two elements were swapped in inner loop, then array is sorted
    if (!swapped) break;
  }
  return arr;
}
const sampleArrayForSort = [
  12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213,
];
console.log(
  `Expected: [3223,546,455,345,234,213,122,98,84,64,23,12,9,4,1], Actual: ${bubbleSortDescending(
    [...sampleArrayForSort]
  )}`
);
// Problem 25
function longestCountryName(countryNames) {
  if (countryNames.length === 0) {
    return "";
  }
  let longestName = "";
  for (const name of countryNames) {
    if (name.length > longestName.length) {
      longestName = name;
    }
  }
  return longestName;
}
console.log(
  `Expected: United States of America, Actual: ${longestCountryName([
    "Australia",
    "Germany",
    "United States of America",
  ])}`
);
// Problem 26
function lengthOfLongestSubstringWithoutRepeating(s) {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map(); // Stores the last seen index of each character

  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    // If the character is already in the map and its index is within the current window
    if (charMap.has(currentChar) && charMap.get(currentChar) >= start) {
      // Move the start of the window to the right of the last occurrence of currentChar
      start = charMap.get(currentChar) + 1;
    }
    // Update the last seen index of the current character
    charMap.set(currentChar, end);
    // Calculate the length of the current window and update maxLength
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
}
console.log(
  `Expected: 3, Actual: ${lengthOfLongestSubstringWithoutRepeating("abcabcbb")}`
);
// Problem 27
function longestPalindromeSubstring(s) {
  let longest = "";

  // Helper function to check if a substring is a palindrome
  function isSubPalindrome(sub) {
    let left = 0;
    let right = sub.length - 1;
    while (left < right) {
      if (sub[left] !== sub[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const substring = s.substring(i, j + 1);
      if (isSubPalindrome(substring) && substring.length > longest.length) {
        longest = substring;
      }
    }
  }
  return longest;
}
console.log(
  `Expected: bab or aba, Actual: ${longestPalindromeSubstring("babad")}`
);
// Problem 28
function executeCallback(value, callback) {
  if (typeof callback !== "function") {
    return "Callback must be a function.";
  }
  return callback(value);
}
function square(n) {
  return n * n;
}
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(`Expected: 25, Actual: ${executeCallback(5, square)}`);
console.log(
  `Expected: Hello, World!, Actual: ${executeCallback("World", greet)}`
);
// Problem 29
function getFunctionName(func) {
  if (typeof func !== "function") {
    return "Argument must be a function.";
  }
  return func.name || "anonymous";
}
function namedFunctionExample() {}
const anonymousFunc = function () {};
const arrowFunc = () => {};
console.log(
  `Expected: namedFunctionExample, Actual: ${getFunctionName(
    namedFunctionExample
  )}`
);
console.log(
  `Expected: anonymousFunc, Actual: ${getFunctionName(anonymousFunc)}`
);
