export interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  section: string;
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
    section: "Arrays",
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
    section: "Strings",
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
  },
  {
    id: 3,
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.`,
    difficulty: "Easy",
    category: "Stack",
    section: "Stacks",
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    testCases: [
      { input: ["()"], output: true },
      { input: ["()[]{}"], output: true },
      { input: ["(]"], output: false }
    ],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
    timeComplexity: "O(n)",
    interviewerTips: [
      "Use a stack to track open brackets.",
      "Check for matching pairs and order.",
      "Return false for any mismatch or leftover stack items."
    ],
  },
  {
    id: 4,
    title: "Implement Queue using Stacks",
    description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, pop, peek, empty).`,
    difficulty: "Medium",
    category: "Queue",
    section: "Queues",
    examples: [
      { input: 'push(1), push(2), peek(), pop(), empty()', output: '1, 1, false' }
    ],
    testCases: [
      { input: [], output: undefined }
    ],
    starterCode: `/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    
};`,
    timeComplexity: "O(1) amortized per operation",
    interviewerTips: [
      "Use two stacks: one for input, one for output.",
      "Transfer elements between stacks as needed.",
      "Understand amortized time complexity."
    ],
  },
  {
    id: 5,
    title: "Group Anagrams",
    description: `Given an array of strings, group the anagrams together. You can return the answer in any order.`,
    difficulty: "Medium",
    category: "Hash Map",
    section: "Maps",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[ ["eat","tea","ate"], ["tan","nat"], ["bat"] ]' }
    ],
    testCases: [
      { input: [["eat","tea","tan","ate","nat","bat"]], output: [["eat","tea","ate"],["tan","nat"],["bat"]] }
    ],
    starterCode: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    
};`,
    timeComplexity: "O(NK log K)",
    interviewerTips: [
      "Use a hash map with sorted string as key.",
      "Group words by their sorted character sequence.",
      "Return grouped values from the map."
    ],
  },
  {
    id: 6,
    title: "Top K Frequent Elements",
    description: `Given a non-empty array of integers, return the k most frequent elements.`,
    difficulty: "Medium",
    category: "Heap",
    section: "Heaps",
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' }
    ],
    testCases: [
      { input: [[1,1,1,2,2,3], 2], output: [1,2] }
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    
};`,
    timeComplexity: "O(N log k)",
    interviewerTips: [
      "Use a hash map to count frequencies.",
      "Use a min-heap to keep track of top k elements.",
      "Return the elements from the heap."
    ],
  },
  {
    id: 7,
    title: "Binary Tree Level Order Traversal",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    difficulty: "Medium",
    category: "Tree",
    section: "Trees",
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }
    ],
    testCases: [
      { input: [[3,9,20,null,null,15,7]], output: [[3],[9,20],[15,7]] }
    ],
    starterCode: `/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    
};`,
    timeComplexity: "O(n)",
    interviewerTips: [
      "Use a queue for breadth-first traversal.",
      "Track nodes at each level.",
      "Return a list of levels."
    ],
  },
  {
    id: 8,
    title: "LRU Cache",
    description: `Design and implement a data structure for Least Recently Used (LRU) cache. It should support get and put operations.`,
    difficulty: "Hard",
    category: "Design",
    section: "Maps",
    examples: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)', output: '1, -1, -1, 3, 4' }
    ],
    testCases: [
      { input: [], output: undefined }
    ],
    starterCode: `/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    
};`,
    timeComplexity: "O(1) per operation",
    interviewerTips: [
      "Use a hash map and doubly linked list.",
      "Move accessed nodes to the front.",
      "Evict least recently used node when capacity is exceeded."
    ],
  },
  {
    id: 9,
    title: "Valid Palindrome",
    description: `Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.`,
    difficulty: "Easy",
    category: "String",
    section: "Strings",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
      { input: 's = "race a car"', output: 'false' }
    ],
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], output: true },
      { input: ["race a car"], output: false }
    ],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    
};`,
    timeComplexity: "O(n)",
    interviewerTips: [
      "Use two pointers to compare characters.",
      "Ignore non-alphanumeric characters.",
      "Convert all characters to lower case."
    ],
  },
  {
    id: 10,
    title: "Min Stack",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.`,
    difficulty: "Medium",
    category: "Stack",
    section: "Stacks",
    examples: [
      { input: 'MinStack(), push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()', output: '-3, 0, -2' }
    ],
    testCases: [
      { input: [], output: undefined }
    ],
    starterCode: `var MinStack = function() {
    
};

/**
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    
};

MinStack.prototype.pop = function() {
    
};

MinStack.prototype.top = function() {
    
};

MinStack.prototype.getMin = function() {
    
};`,
    timeComplexity: "O(1) per operation",
    interviewerTips: [
      "Use an auxiliary stack to track minimums.",
      "Push to both stacks when new min is found.",
      "Pop from both stacks when popping the min."
    ],
  },
  {
    id: 11,
    title: "Binary Search",
    description: `Given a sorted array of n integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.`,
    difficulty: "Easy",
    category: "Array",
    section: "Arrays",
    examples: [
      { input: 'nums = [1,3,5,6], target = 5', output: '2' },
      { input: 'nums = [1,3,5,6], target = 2', output: '1' }
    ],
    testCases: [
      { input: [[1,3,5,6], 5], output: 2 },
      { input: [[1,3,5,6], 2], output: 1 }
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    
};`,
    timeComplexity: "O(log n)",
    interviewerTips: [
      "Use binary search algorithm.",
      "Return left pointer for insert position.",
      "Handle edge cases for empty arrays."
    ],
  },
  {
    id: 12,
    title: "Clone Graph",
    description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.`,
    difficulty: "Medium",
    category: "Graph",
    section: "Graphs",
    examples: [
      { input: 'adjacency list = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }
    ],
    testCases: [
      { input: [[[2,4],[1,3],[2,4],[1,3]]], output: [[2,4],[1,3],[2,4],[1,3]] }
    ],
    starterCode: `/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    
};`,
    timeComplexity: "O(N)",
    interviewerTips: [
      "Use BFS or DFS with a hash map to track visited nodes.",
      "Clone nodes and their neighbors recursively or iteratively.",
      "Handle empty input (null node)."
    ],
  }
]; 