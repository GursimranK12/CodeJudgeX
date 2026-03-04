export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status?: 'pending' | 'passed' | 'failed';
  explanation?: string;
}

export interface Solution {
  language: string;
  code: string;
  explanation: string;
}

export interface Resource {
  title: string;
  url: string;
  source: string;
}

export interface Video {
  title: string;
  url: string;
  thumbnail?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  testCases: TestCase[];
  constraints: string[];
  starterCode: string;
  solutions: Solution[];
  resources: Resource[];
  videos: Video[];
}

export const MOCK_PROBLEM: Problem = {
  id: '1',
  title: 'Two Sum',
  difficulty: 'Easy',
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
  testCases: [
    {
      id: 1,
      input: 'nums = [2,7,11,15], target = 9',
      expectedOutput: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      id: 2,
      input: 'nums = [3,2,4], target = 6',
      expectedOutput: '[1,2]'
    },
    {
      id: 3,
      input: 'nums = [3,3], target = 6',
      expectedOutput: '[0,1]'
    }
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.'
  ],
  starterCode: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your Java code here
        
    }
}`,
  solutions: [
    {
      language: 'Java',
      code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      explanation: 'This solution uses a Hash Map to store the value and its index. For each element, we check if its complement (target - current value) exists in the map. This achieves O(n) time complexity.'
    }
  ],
  resources: [
    {
      title: 'Hashing Data Structure - GeeksforGeeks',
      url: 'https://www.geeksforgeeks.org/hashing-data-structure/',
      source: 'GeeksforGeeks'
    },
    {
      title: 'Arrays in Java - GeeksforGeeks',
      url: 'https://www.geeksforgeeks.org/arrays-in-java/',
      source: 'GeeksforGeeks'
    }
  ],
  videos: [
    {
      title: 'Two Sum : Best Logic & Optimization by Striver (takeUforward)',
      url: 'https://www.youtube.com/embed/UXDSeD9mN-k',
      thumbnail: 'https://img.youtube.com/vi/UXDSeD9mN-k/0.jpg'
    },
    {
      title: 'Two Sum Problem - Java Beginner Friendly by Kunal Kushwaha',
      url: 'https://www.youtube.com/embed/KLlXCFG5TnA',
      thumbnail: 'https://img.youtube.com/vi/KLlXCFG5TnA/0.jpg'
    }
  ]
};
