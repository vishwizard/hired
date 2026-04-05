export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png", // Make sure you have this icon!
    monacoLang: "cpp", 
  }
};

export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]\nconsole.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]\nconsole.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]\nprint(twoSum([3, 2, 4], 6))  # Expected: [1, 2]\nprint(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;\n\nclass Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));\n        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6)));\n        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6)));\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n    return {};\n}\n\nint main() {\n    vector<int> n1 = {2, 7, 11, 15}; vector<int> r1 = twoSum(n1, 9);\n    if(r1.size() == 2) cout << "[" << r1[0] << "," << r1[1] << "]\\n";\n    \n    vector<int> n2 = {3, 2, 4}; vector<int> r2 = twoSum(n2, 6);\n    if(r2.size() == 2) cout << "[" << r2[0] << "," << r2[1] << "]\\n";\n\n    vector<int> n3 = {3, 3}; vector<int> r3 = twoSum(n3, 6);\n    if(r3.size() == 2) cout << "[" << r3[0] << "," << r3[1] << "]\\n";\n    return 0;\n}`
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
      cpp: "[0,1]\n[1,2]\n[0,1]"
    },
  },
  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {\n  // Write your solution here\n}\n\n// Test cases\nlet test1 = ["h","e","l","l","o"];\nreverseString(test1);\nconsole.log(test1); // Expected: ["o","l","l","e","h"]\n\nlet test2 = ["H","a","n","n","a","h"];\nreverseString(test2);\nconsole.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):\n    # Write your solution here\n    pass\n\n# Test cases\ntest1 = ["h","e","l","l","o"]\nreverseString(test1)\nprint(test1)  # Expected: ["o","l","l","e","h"]\n\ntest2 = ["H","a","n","n","a","h"]\nreverseString(test2)\nprint(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;\n\nclass Solution {\n    public static void reverseString(char[] s) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        char[] test1 = {'h','e','l','l','o'};\n        reverseString(test1);\n        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]\n        \n        char[] test2 = {'H','a','n','n','a','h'};\n        reverseString(test2);\n        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid reverseString(vector<char>& s) {\n    // Write your solution here\n}\n\nvoid printVector(const vector<char>& v) {\n    cout << "[";\n    for(int i=0; i<v.size(); i++) cout << '"' << v[i] << '"' << (i < v.size()-1 ? "," : "");\n    cout << "]\\n";\n}\n\nint main() {\n    vector<char> t1 = {'h','e','l','l','o'};\n    reverseString(t1); printVector(t1);\n    vector<char> t2 = {'H','a','n','n','a','h'};\n    reverseString(t2); printVector(t2);\n    return 0;\n}`
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
      cpp: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]'
    },
  },
  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
      notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
    },
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" },
      { input: 's = " "', output: "true" },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {\n  // Write your solution here\n}\n\n// Test cases\nconsole.log(isPalindrome("A man, a plan, a canal: Panama"));\nconsole.log(isPalindrome("race a car"));\nconsole.log(isPalindrome(" "));`,
      python: `def isPalindrome(s):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(isPalindrome("A man, a plan, a canal: Panama"))\nprint(isPalindrome("race a car"))\nprint(isPalindrome(" "))`,
      java: `class Solution {\n    public static boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));\n        System.out.println(isPalindrome("race a car"));\n        System.out.println(isPalindrome(" "));\n    }\n}`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // Write your solution here\n    return false;\n}\n\nint main() {\n    cout << (isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << endl;\n    cout << (isPalindrome("race a car") ? "true" : "false") << endl;\n    cout << (isPalindrome(" ") ? "true" : "false") << endl;\n    return 0;\n}`
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
      cpp: "true\nfalse\ntrue"
    },
  },
  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  // Write your solution here\n}\n\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));\nconsole.log(maxSubArray([1]));\nconsole.log(maxSubArray([5,4,-1,7,8]));`,
      python: `def maxSubArray(nums):\n    # Write your solution here\n    pass\n\nprint(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))\nprint(maxSubArray([1]))\nprint(maxSubArray([5,4,-1,7,8]))`,
      java: `class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));\n        System.out.println(maxSubArray(new int[]{1}));\n        System.out.println(maxSubArray(new int[]{5,4,-1,7,8}));\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    vector<int> t1 = {-2,1,-3,4,-1,2,1,-5,4}; cout << maxSubArray(t1) << endl;\n    vector<int> t2 = {1}; cout << maxSubArray(t2) << endl;\n    vector<int> t3 = {5,4,-1,7,8}; cout << maxSubArray(t3) << endl;\n    return 0;\n}`
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
      cpp: "6\n1\n23"
    },
  },
  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store."
      ],
    },
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {\n  // Write your solution here\n}\n\nconsole.log(maxArea([1,8,6,2,5,4,8,3,7]));\nconsole.log(maxArea([1,1]));`,
      python: `def maxArea(height):\n    # Write your solution here\n    pass\n\nprint(maxArea([1,8,6,2,5,4,8,3,7]))\nprint(maxArea([1,1]))`,
      java: `class Solution {\n    public static int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7}));\n        System.out.println(maxArea(new int[]{1,1}));\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxArea(vector<int>& height) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    vector<int> t1 = {1,8,6,2,5,4,8,3,7}; cout << maxArea(t1) << endl;\n    vector<int> t2 = {1,1}; cout << maxArea(t2) << endl;\n    return 0;\n}`
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
      cpp: "49\n1"
    },
  },
};