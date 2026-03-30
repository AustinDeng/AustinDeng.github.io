---
date: 2026-03-25
category:
  - 算法
tag:
  - 数据结构
  - 算法
  - LeetCode
cover: /assets/posts/封面/2.jpg
---

# LeetCodeHot100

这篇文章记录了本人在 LeetCode 刷 [LeetCode 热题100](https://leetcode.cn/studyplan/top-100-liked/)的相关代码、解题思路以及关键知识点等等


## 1. [两数之和](https://leetcode.cn/problems/two-sum/description/)[easy]

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

### 思路

用一个map记录之前遍历过的数以及对应的下标，如果之后的遍历刚刚好遇到**需要的数(与之相加和为target)**，直接返回即可

时间复杂度`O(n)`，一次遍历数组即可
空间复杂度`O(n)`，需要一个额外的map

### 代码
``` C++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> m;
        int n = nums.size();

        for(int i=0; i<n; i++) {
            if(m.count(nums[i])){
                return {i, m[nums[i]]};
            }else {
                m[target-nums[i]] = i;
            }
        }

        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    vector<int> res1 = sol.twoSum(nums1, target1);
    cout << "Test case 1: nums = [2,7,11,15], target = 9" << endl;
    cout << "Result: [" << res1[0] << ", " << res1[1] << "]" << endl;
    cout << "Sum check: " << nums1[res1[0]] << " + " << nums1[res1[1]] << " = " 
         << nums1[res1[0]] + nums1[res1[1]] << endl << endl;

    vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    vector<int> res2 = sol.twoSum(nums2, target2);
    cout << "Test case 2: nums = [3,2,4], target = 6" << endl;
    cout << "Result: [" << res2[0] << ", " << res2[1] << "]" << endl;
    cout << "Sum check: " << nums2[res2[0]] << " + " << nums2[res2[1]] << " = " 
         << nums2[res2[0]] + nums2[res2[1]] << endl << endl;

    vector<int> nums3 = {3, 3};
    int target3 = 6;
    vector<int> res3 = sol.twoSum(nums3, target3);
    cout << "Test case 3: nums = [3,3], target = 6" << endl;
    cout << "Result: [" << res3[0] << ", " << res3[1] << "]" << endl;
    cout << "Sum check: " << nums3[res3[0]] << " + " << nums3[res3[1]] << " = " 
         << nums3[res3[0]] + nums3[res3[1]] << endl << endl;

    // 额外测试：无解情况
    vector<int> nums4 = {1, 2, 3};
    int target4 = 7;
    vector<int> res4 = sol.twoSum(nums4, target4);
    cout << "Test case 4: nums = [1,2,3], target = 7" << endl;
    if (res4.empty()) {
        cout << "No solution found (empty vector returned)" << endl;
    } else {
        cout << "Result: [" << res4[0] << ", " << res4[1] << "]" << endl;
    }

    return 0;
}
```



