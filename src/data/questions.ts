export interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  testCases: {
    input: unknown[];
    output: unknown;
  }[];
  starterCode: string;
  timeComplexity: string;
  interviewerTips: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    description: `Given a sorted array of integers nums (sorted in ascending order) and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    category: "Array",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [2,3,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    testCases: [
      { input: [[2, 7, 11, 15], 9], output: [0, 1] },
      { input: [[2, 3, 4], 6], output: [0, 2] },
      { input: [[3, 3, 6], 6], output: [0, 1] }
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    console.log("Starting Two Sum with:", { nums, target });
    
    // Your code here
    
    console.log("No solution found");
    return [];
};`,
    timeComplexity: "O(n)",
    interviewerTips: [
      "Use the two-pointer technique for sorted arrays to achieve O(n) time complexity.",
      "Name your variables descriptively (e.g., left, right instead of i, j).",
      "Add comments to explain your approach, especially if using two pointers.",
      "Handle edge cases and validate input if this were a real-world scenario.",
      "Consider using const/let appropriately for variable declarations."
    ],
  },
  {
    id: 2,
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    difficulty: "Easy",
    category: "String",
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    testCases: [
      { input: [["h","e","l","l","o"]], output: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], output: ["h","a","n","n","a","H"] }
    ],
    starterCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    
};`,
    timeComplexity: "O(n)",
    interviewerTips: [
      "Use two pointers to swap characters in place for O(1) extra space.",
      "Add comments to explain your approach.",
      "Use descriptive variable names (e.g., left, right).",
      "Consider edge cases such as empty arrays or single-character arrays."
    ],
  }
]; 