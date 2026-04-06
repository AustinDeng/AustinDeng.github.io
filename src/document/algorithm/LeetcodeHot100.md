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

**思路**

用一个map记录之前遍历过的数以及对应的下标，如果之后的遍历刚刚好遇到**需要的数(与之相加和为target)**，直接返回即可

时间复杂度`O(n)`，一次遍历数组即可
空间复杂度`O(n)`，需要一个额外的map

**代码**
```C++ :collapsed-lines=25
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

## 2. [字母异位词分组](https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个字符串数组，请你将 [字母异位词](# "字母异位词是通过重新排列不同单词或短语的字母而形成的单词或短语，并使用所有原字母一次。") 组合在一起。可以按任意顺序返回结果列表。

示例 1:

>输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
>输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

>解释：
>在 strs 中没有字符串可以通过重新排列来形成 "bat"。
>字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
>字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。

示例 2:
>输入: strs = [""]
>输出: [[""]]

示例 3:
>输入: strs = ["a"]
>输出: [["a"]]
 

提示：
- `1 <= strs.length <= 104`
- `0 <= strs[i].length <= 100`
- `strs[i] 仅包含小写字母`

**思路**
每个互为字母异位词的单词都包含相同的字母，因此把每个单词排序之后作为key，使用一个map记录同一个key的字母异位词即可

代码中使用了unordered_map数据结构，不禁令人想问**unordered_map 和 map有什么区别呢？**

::: tip C++ 中 unordered_map 和 map 的区别


| **特性** | std::map | std::unordered_map | 
| :---: | :---: | :---: |
| **底层实现**​| 红黑树 (自平衡二叉搜索树)| 哈希表 |
| **元素顺序​**| 根据键自动排序 (默认std::less，通常为升序)| 无序​ (顺序取决于哈希函数和插入顺序)| 
| **时间复杂度​**| 插入、删除、查找：O(log n)​| 平均情况：插入、删除、查找：O(1)​ 最坏情况：O(n)​| 
| **需要键的类型提供**​| 必须定义比较操作​ (如 <或自定义比较器)| 必须定义哈希函数​ (如 std::hash) 和相等比较​ (如 ==)| 
| **迭代器性质​**| 提供有序遍历，迭代器稳定 (除被删除元素外)| 提供无序遍历，插入操作可能导致迭代器失效| 
| **内存使用​**| 通常较低 (树节点开销)| 通常较高 (维护哈希桶)| 
| **使用场景​**| 需要元素有序遍历或按范围查询| 需要极快的单点访问，且不关心顺序| 

**核心总结与选择建议：**

**1. 有序 vs 无序：**

- 这是最直观的区别。如果你需要按键的顺序（如字母顺序、数字大小）来遍历或处理元素，用 std::map。如果顺序无关紧要，只关心键值是否存在或快速存取，用 std::unordered_map。

**2. 性能权衡：**

- std::map​ 的 O(log n)操作非常稳定，适合元素数量大或对单次操作最坏时间有要求的场景。

- std::unordered_map​ 在平均情况下常数时间的访问速度极快，是大多数“查找表”的首选。但其性能严重依赖于哈希函数的质量。自定义类型作为键时，必须提供良好的哈希函数。

**3. 自定义键类型：**

- 为自定义类型使用 std::map，你只需要重载 <运算符或提供比较函子。

- 为自定义类型使用 std::unordered_map，你必须做两件事：
  1) 提供计算哈希值的函子（或特化 std::hash）
  2) 重载 ==运算符或提供相等比较函子

```C++ 
#include <iostream>
#include <map>
#include <unordered_map>

int main() {
    // std::map - 有序输出
    std::map<std::string, int> ordered_map = {{"zebra", 2}, {"apple", 5}};
    for (const auto& p : ordered_map) {
        std::cout << p.first << " "; // 输出：apple zebra
    }
    std::cout << std::endl;

    // std::unordered_map - 无序输出
    std::unordered_map<std::string, int> unordered_map = {{"zebra", 2}, {"apple", 5}};
    for (const auto& p : unordered_map) {
        std::cout << p.first << " "; // 输出可能是：zebra apple 或 apple zebra
    }
    return 0;
}
```

:::


**代码**
``` C++ :collapsed-lines=25
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
#include <iostream>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> m;
        for(string& str:strs) {
            string key = str;
            sort(key.begin(), key.end());
            m[key].emplace_back(str);
        }
        vector<vector<string>> res;
        for(auto it = m.begin(); it != m.end(); it++) {
            res.emplace_back(it->second);
        }
        return res;
    }
};

// 测试函数
void testGroupAnagrams() {
    Solution solution;
    
    // 测试用例1：标准情况
    {
        vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        vector<vector<string>> result = solution.groupAnagrams(strs);
        
        cout << "测试用例1: " << endl;
        for(const auto& group : result) {
            cout << "[";
            for(size_t i = 0; i < group.size(); i++) {
                cout << group[i];
                if(i != group.size() - 1) cout << ", ";
            }
            cout << "]" << endl;
        }
        cout << endl;
    }
    
    // 测试用例2：空数组
    {
        vector<string> strs = {};
        vector<vector<string>> result = solution.groupAnagrams(strs);
        
        cout << "测试用例2 (空数组): " << endl;
        cout << "分组数量: " << result.size() << endl << endl;
    }
    
    // 测试用例3：单个元素
    {
        vector<string> strs = {"abc"};
        vector<vector<string>> result = solution.groupAnagrams(strs);
        
        cout << "测试用例3 (单个元素): " << endl;
        for(const auto& group : result) {
            cout << "[";
            for(size_t i = 0; i < group.size(); i++) {
                cout << group[i];
                if(i != group.size() - 1) cout << ", ";
            }
            cout << "]" << endl;
        }
        cout << endl;
    }
    
    // 测试用例4：无字母异位词
    {
        vector<string> strs = {"abc", "def", "ghi"};
        vector<vector<string>> result = solution.groupAnagrams(strs);
        
        cout << "测试用例4 (无字母异位词): " << endl;
        for(const auto& group : result) {
            cout << "[";
            for(size_t i = 0; i < group.size(); i++) {
                cout << group[i];
                if(i != group.size() - 1) cout << ", ";
            }
            cout << "]" << endl;
        }
        cout << endl;
    }
    
    // 测试用例5：包含空字符串
    {
        vector<string> strs = {"", "a", "", "b"};
        vector<vector<string>> result = solution.groupAnagrams(strs);
        
        cout << "测试用例5 (包含空字符串): " << endl;
        for(const auto& group : result) {
            cout << "[";
            for(size_t i = 0; i < group.size(); i++) {
                cout << "\"" << group[i] << "\"";
                if(i != group.size() - 1) cout << ", ";
            }
            cout << "]" << endl;
        }
    }
}

int main() {
    testGroupAnagrams();
    return 0;
}
```

## 3. [最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

**示例 1：**
>输入：nums = [100,4,200,1,3,2]
>输出：4
>解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

**示例 2：**
>输入：nums = [0,3,7,2,5,8,4,6,0,1]
>输出：9

**示例 3：**
>输入：nums = [1,0,1,2]
>输出：3

**思路**

题目要求连续的序列不必在原数组中是连续的，最朴素的方法就是排序然后一次遍历，找出最长连续子序列
但是排序的时间复杂度至少O(logn)，不符合题目要求

显然符合O(n)要求的只能一重遍历，不能排序

可以用一个set记录数组中存在的数，然后一次遍历数组，找到每个连续序列的开头，再依次查找连续的序列元素即可
使用set有一个好处就是能帮助去重

::: tip C++ 中 unordered_set 和 set 的区别

和上一题的 unordered_map 与 map 的区别是类似的，只是容器类型从关联数组变成了集合。

:::

**代码**

``` C++ :collapsed-lines=25
#include <vector>
#include <unordered_set>
#include <algorithm>
#include <iostream>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> s;
        for(const int& i: nums) {
            s.insert(i);
        }

        int res = 0;
        for(const int& i: s) {
            if(!s.count(i-1)) {
                int step = 1;
                int curr = i;

                while(s.count(curr+1)) {
                    step++;
                    curr++;
                }

                res = max(res, step);
            }
        }

        return res;
    }
};

// 测试函数
void testLongestConsecutive() {
    Solution solution;
    
    // 测试用例1：标准情况
    {
        vector<int> nums = {100, 4, 200, 1, 3, 2};
        int result = solution.longestConsecutive(nums);
        cout << "测试用例1: [100, 4, 200, 1, 3, 2]" << endl;
        cout << "最长连续序列长度: " << result << endl;
        cout << "期望: 4 (序列: 1, 2, 3, 4)" << endl << endl;
    }
    
    // 测试用例2：空数组
    {
        vector<int> nums = {};
        int result = solution.longestConsecutive(nums);
        cout << "测试用例2 (空数组): []" << endl;
        cout << "最长连续序列长度: " << result << endl;
        cout << "期望: 0" << endl << endl;
    }
    
    // 测试用例3：单个元素
    {
        vector<int> nums = {5};
        int result = solution.longestConsecutive(nums);
        cout << "测试用例3 (单个元素): [5]" << endl;
        cout << "最长连续序列长度: " << result << endl;
        cout << "期望: 1" << endl << endl;
    }
    
    // 测试用例4：有重复元素
    {
        vector<int> nums = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};
        int result = solution.longestConsecutive(nums);
        cout << "测试用例4 (有重复元素): [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]" << endl;
        cout << "最长连续序列长度: " << result << endl;
        cout << "期望: 9 (序列: 0, 1, 2, 3, 4, 5, 6, 7, 8)" << endl << endl;
    }
    
    // 测试用例5：负数
    {
        vector<int> nums = {-5, -3, -4, -2, -1, 0, 1};
        int result = solution.longestConsecutive(nums);
        cout << "测试用例5 (负数): [-5, -3, -4, -2, -1, 0, 1]" << endl;
        cout << "最长连续序列长度: " << result << endl;
        cout << "期望: 7 (序列: -5, -4, -3, -2, -1, 0, 1)" << endl << endl;
    }
    
    // 测试用例6：不连续序列
    {
        vector<int> nums = {10, 20, 30, 40};
        int result = solution.longestConsecutive(nums);
        cout << "测试用例6 (不连续序列): [10, 20, 30, 40]" << endl;
        cout << "最长连续序列长度: " << result << endl;
        cout << "期望: 1" << endl << endl;
    }
    
    // 测试用例7：多个连续序列
    {
        vector<int> nums = {1, 2, 3, 10, 11, 12, 20, 21, 22, 23};
        int result = solution.longestConsecutive(nums);
        cout << "测试用例7 (多个连续序列): [1, 2, 3, 10, 11, 12, 20, 21, 22, 23]" << endl;
        cout << "最长连续序列长度: " << result << endl;
        cout << "期望: 4 (序列: 20, 21, 22, 23)" << endl << endl;
    }
}

int main() {
    testLongestConsecutive();
    return 0;
}
```


## 4. [移动零](https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。

**示例 1:**
>输入: nums = [0,1,0,3,12]
>输出: [1,3,12,0,0]

**示例 2:**
>输入: nums = [0]
>输出: [0]
 

**提示:**
`1 <= nums.length <= 104`
`-2^31 <= nums[i] <= 2^31 - 1`

**思路**

思路1：使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部
思路2：两次遍历，记录零的个数，填入到数组尾部


**代码**
``` C++ :collapsed-lines=25
#include <iostream>
#include <vector>
#include <cassert>

using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int cnt = 0;
        int idx = 0;
        for(int i=0; i<nums.size(); i++) {
            if(nums[i] == 0) {
                cnt += 1;
            } else {
                nums[idx] = nums[i];
                idx += 1;
            }
        }

        for(int i=nums.size()-1; i>=0 && cnt>0; i--) {
            nums[i] = 0;
            cnt--;
        }
    }
};

// 测试函数
void testMoveZeroes() {
    Solution solution;
    
    // 测试用例1: 普通情况
    {
        vector<int> nums = {0, 1, 0, 3, 12};
        vector<int> expected = {1, 3, 12, 0, 0};
        solution.moveZeroes(nums);
        cout << "测试用例1: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    // 测试用例2: 全零数组
    {
        vector<int> nums = {0, 0, 0, 0};
        vector<int> expected = {0, 0, 0, 0};
        solution.moveZeroes(nums);
        cout << "测试用例2: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    // 测试用例3: 无零数组
    {
        vector<int> nums = {1, 2, 3, 4, 5};
        vector<int> expected = {1, 2, 3, 4, 5};
        solution.moveZeroes(nums);
        cout << "测试用例3: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    // 测试用例4: 单元素零
    {
        vector<int> nums = {0};
        vector<int> expected = {0};
        solution.moveZeroes(nums);
        cout << "测试用例4: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    // 测试用例5: 单元素非零
    {
        vector<int> nums = {5};
        vector<int> expected = {5};
        solution.moveZeroes(nums);
        cout << "测试用例5: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    // 测试用例6: 零在末尾
    {
        vector<int> nums = {1, 2, 3, 0, 0};
        vector<int> expected = {1, 2, 3, 0, 0};
        solution.moveZeroes(nums);
        cout << "测试用例6: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    // 测试用例7: 零在开头
    {
        vector<int> nums = {0, 0, 1, 2, 3};
        vector<int> expected = {1, 2, 3, 0, 0};
        solution.moveZeroes(nums);
        cout << "测试用例7: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    // 测试用例8: 交错零
    {
        vector<int> nums = {1, 0, 2, 0, 3, 0, 4};
        vector<int> expected = {1, 2, 3, 4, 0, 0, 0};
        solution.moveZeroes(nums);
        cout << "测试用例8: ";
        assert(nums == expected);
        for (int num : nums) cout << num << " ";
        cout << "✓" << endl;
    }
    
    cout << "\n所有测试用例通过！" << endl;
}

int main() {
    testMoveZeroes();
    return 0;
}
```

## 5. [盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
返回容器可以储存的最大水量。
说明：你不能倾斜容器。

**示例 1：**
>输入：[1,8,6,2,5,4,8,3,7]
>输出：49 

**示例 2：**
>输入：height = [1,1]
>输出：1

**思路**

这题很明显用双指针一前一后找到最大的盛水量的索引

具体的：
1. 初始化左指针在数组的首部，右指针在数组的尾部
2. 计算当前左指针和右指针所能盛水的量，更新记录最大值
3. 当左指针的数值较右指针小时，移动左指针向右；否则移动右指针向左
4. 重复第二步直到左右指针相遇

时间复杂度：O(N)
空间复杂度：O(1)

**代码**
``` C++ :collapsed-lines=25
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int i = 0, j = height.size() - 1;
        int res = 0;

        while (i < j) {
            int curr = min(height[i], height[j]) * (j - i);
            res = max(res, curr);

            if (height[i] <= height[j]) {
                i++;
            } else {
                j--;
            }
        }

        return res;
    }
};

// 测试用例
int main() {
    Solution solution;
    
    // 测试用例1: 示例
    vector<int> height1 = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    int result1 = solution.maxArea(height1);
    cout << "Test 1: " << result1 << " (Expected: 49)" << endl;
    
    // 测试用例2: 两个元素
    vector<int> height2 = {1, 1};
    int result2 = solution.maxArea(height2);
    cout << "Test 2: " << result2 << " (Expected: 1)" << endl;
    
    // 测试用例3: 递增序列
    vector<int> height3 = {1, 2, 3, 4, 5};
    int result3 = solution.maxArea(height3);
    cout << "Test 3: " << result3 << " (Expected: 6)" << endl;
    
    // 测试用例4: 递减序列
    vector<int> height4 = {5, 4, 3, 2, 1};
    int result4 = solution.maxArea(height4);
    cout << "Test 4: " << result4 << " (Expected: 6)" << endl;
    
    // 测试用例5: 高墙在中间
    vector<int> height5 = {4, 3, 2, 1, 4};
    int result5 = solution.maxArea(height5);
    cout << "Test 5: " << result5 << " (Expected: 16)" << endl;
    
    // 测试用例6: 只有一个元素
    vector<int> height6 = {1};
    int result6 = solution.maxArea(height6);
    cout << "Test 6: " << result6 << " (Expected: 0)" << endl;
    
    // 测试用例7: 随机测试
    vector<int> height7 = {2, 3, 4, 5, 18, 17, 6};
    int result7 = solution.maxArea(height7);
    cout << "Test 7: " << result7 << " (Expected: 17)" << endl;
    
    return 0;
}
```


## 6. [三数之和](https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0` 。请你返回所有和为 `0` 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

**示例 1：**
>输入：nums = [-1,0,1,2,-1,-4]
>输出：[[-1,-1,2],[-1,0,1]]
>解释：
>nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
>nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
>nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
>不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
>注意，输出的顺序和三元组的顺序并不重要。

**示例 2：**
>输入：nums = [0,1,1]
>输出：[]
>解释：唯一可能的三元组和不为 0 。

**示例 3：**
>输入：nums = [0,0,0]
>输出：[[0,0,0]]
>解释：唯一可能的三元组和为 0 。
 

**提示：**
`3 <= nums.length <= 3000`
`-10^5 <= nums[i] <= 10^5`

**思路**

**代码**
``` C++ :collapsed-lines=25

```


## 7. [接雨水](https://leetcode.cn/problems/trapping-rain-water/description/?envType=study-plan-v2&envId=top-100-liked)[major]

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**
>输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
>输出：6

**示例 2：**
>输入：height = [4,2,0,3,2,5]
>输出：9
 

**提示：**
`n == height.length`
`1 <= n <= 2 * 10^4`
`0 <= height[i] <= 10^5`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 8. [无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&envId=top-100-liked)[minor]
给定一个字符串 `s` ，请你找出其中不含有重复字符的 最长子串的长度。

**示例 1:**
>输入: s = "abcabcbb"
>输出: 3 
>解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。注意 "bca" 和 "cab" 也是正确答案。

**示例 2:**
>输入: s = "bbbbb"
>输出: 1
>解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

**示例 3:**
>输入: s = "pwwkew"
>输出: 3
>解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
>     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 

**提示：**
- `0 <= s.length <= 5 * 10^4`
- `s 由英文字母、数字、符号和空格组成`


**思路**

**代码**
``` C++ :collapsed-lines=25

```


## 9. [找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/?envType=study-plan-v2&envId=top-100-liked)[minor]
给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

**示例 1:**
>输入: s = "cbaebabacd", p = "abc"
>输出: [0,6]
>解释:
>起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
>起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

**示例 2:**
>输入: s = "abab", p = "ab"
>输出: [0,1,2]
>解释:
>起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
>起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
>起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
 

**提示:**
- `1 <= s.length, p.length <= 3 * 10^4`
- `s 和 p 仅包含小写字母`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 10. [和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked)[minor]
给你一个整数数组 `nums` 和一个整数 `k` ，请你统计并返回 该数组中和为 `k` 的子数组的个数
子数组是数组中元素的连续非空序列。

**示例 1：**
>输入：nums = [1,1,1], k = 2
>输出：2

**示例 2：**
>输入：nums = [1,2,3], k = 3
>输出：2
 

**提示：**
- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`


**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 11. [滑动窗口最大值](http://leetcode.cn/problems/sliding-window-maximum/description/?envType=study-plan-v2&envId=top-100-liked)[major]
给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。
返回 滑动窗口中的最大值 。

**示例 1：**
>输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
>输出：[3,3,5,5,6,7]
>解释：
>滑动窗口的位置                最大值
>---------------               -----
>[1  3  -1] -3  5  3  6  7       3
> 1 [3  -1  -3] 5  3  6  7       3
> 1  3 [-1  -3  5] 3  6  7       5
> 1  3  -1 [-3  5  3] 6  7       5
> 1  3  -1  -3 [5  3  6] 7       6
> 1  3  -1  -3  5 [3  6  7]      7

**示例 2：**
>输入：nums = [1], k = 1
>输出：[1]
 

**提示：**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 12. [最小覆盖子串](http://leetcode.cn/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-100-liked)[major]
给定两个字符串 `s` 和 `t`，长度分别是 `m` 和 `n`，返回 `s` 中的最短窗口子串，使得该子串包含 `t` 中的每一个字符（包括重复字符）。如果没有这样的子串，返回空字符串 `""`。
测试用例保证答案唯一。

**示例 1：**
>输入：s = "ADOBECODEBANC", t = "ABC"
>输出："BANC"
>解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。

**示例 2：**
>输入：s = "a", t = "a"
>输出："a"
>解释：整个字符串 s 是最小覆盖子串。

**示例 3:**
>输入: s = "a", t = "aa"
>输出: ""
>解释: t 中两个字符 'a' 均应包含在 s 的子串中，
>因此没有符合条件的子字符串，返回空字符串。
 

**提示：**
- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 10^5`
- `s 和 t 由英文字母组成`


**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 13. [最大子数组和](https://leetcode.cn/problems/maximum-subarray/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组是数组中的一个连续部分。

**示例 1：**
>输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
>输出：6
>解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

**示例 2：**
>输入：nums = [1]
>输出：1

**示例 3：**
>输入：nums = [5,4,-1,7,8]
>输出：23
 

**提示：**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 14. [合并区间](https://leetcode.cn/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

**示例 1：**
>输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
>输出：[[1,6],[8,10],[15,18]]
>解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

**示例 2：**
>输入：intervals = [[1,4],[4,5]]
>输出：[[1,5]]
>解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

**示例 3：**
>输入：intervals = [[4,7],[1,4]]
>输出：[[1,7]]
>解释：区间 [1,4] 和 [4,7] 可被视为重叠区间。
 

**提示：**
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^4`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 15. [轮转数组](https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个整数数组 `nums`，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是非负数。

**示例 1:**
>输入: nums = [1,2,3,4,5,6,7], k = 3
>输出: [5,6,7,1,2,3,4]
>解释:
>向右轮转 1 步: [7,1,2,3,4,5,6]
>向右轮转 2 步: [6,7,1,2,3,4,5]
>向右轮转 3 步: [5,6,7,1,2,3,4]

**示例 2:**
>输入：nums = [-1,-100,3,99], k = 2
>输出：[3,99,-1,-100]
>解释: 
>向右轮转 1 步: [99,-1,-100,3]
>向右轮转 2 步: [3,99,-1,-100]
 

**提示：**
- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 16. [除了自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个整数数组 `nums`，返回 数组 `answer` ，其中 `answer[i]` 等于 `nums` 中除了 `nums[i]` 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  `32 位` 整数范围内。

请 不要使用除法，且在 `O(n)` 时间复杂度内完成此题。

**示例 1:**
>输入: nums = [1,2,3,4]
>输出: [24,12,8,6]

**示例 2:**
>输入: nums = [-1,1,0,-3,3]
>输出: [0,0,9,0,0]
 

**提示：**
- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- `输入 保证 数组 answer[i] 在  32 位 整数范围内`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 17. [缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/description/?envType=study-plan-v2&envId=top-100-liked)[major]

给你一个未排序的整数数组 `nums` ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 `O(n)` 并且只使用常数级别额外空间的解决方案。

**示例 1：**
>输入：nums = [1,2,0]
>输出：3
>解释：范围 [1,2] 中的数字都在数组中。

**示例 2：**
>输入：nums = [3,4,-1,1]
>输出：2
>解释：1 在数组中，但 2 没有。

**示例 3：**
>输入：nums = [7,8,9,11,12]
>输出：1
>解释：最小的正数 1 没有出现。
 

**提示：**
- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 18. [矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个 `m x n` 的矩阵，如果一个元素为 `0` ，则将其所在行和列的所有元素都设为 `0` 。请使用 `原地` 算法。

**示例 1：**
>输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
>输出：[[1,0,1],[0,0,0],[1,0,1]]

**示例 2：**
>输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
>输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 

**提示：**
- `m == matrix.length`
- `n == matrix[0].length`
- `1 <= m, n <= 200`
- `-2^31 <= matrix[i][j] <= 2^31 - 1`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 19. [螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个 `m` 行 `n` 列的矩阵 `matrix` ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

**示例 1：**
>输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
>输出：[1,2,3,6,9,8,7,4,5]

**示例 2：**
>输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
>输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 

**提示：**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 20. [旋转图像](https://leetcode.cn/problems/rotate-image/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个 `n × n` 的二维矩阵 `matrix` 表示一个图像。请你将图像顺时针旋转 90 度。
你必须在 `原地` 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

**示例 1：**
>输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
>输出：[[7,4,1],[8,5,2],[9,6,3]]

**示例 2：**
>输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
>输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

**提示：**
- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 21. [搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

编写一个高效的算法来搜索 `m x n` 矩阵 `matrix` 中的一个目标值 `target` 。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 

**示例 1：**
>输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
>输出：true

**示例 2：**
>输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
>输出：false

**提示：**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= n, m <= 300`
- `-10^9 <= matrix[i][j] <= 10^9`
- `每行的所有元素从左到右升序排列`
- `每列的所有元素从上到下升序排列`
- `-10^9 <= target <= 10^9`

**思路**

**代码**
``` C++ :collapsed-lines=25

```


## 22. [相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

图示两个链表在节点 c1 开始相交：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

题目数据 保证 整个链式结构中不存在环。

注意，函数返回结果后，链表必须 保持其原始结构 。

自定义评测：

评测系统 的输入如下（你设计的程序 不适用 此输入）：

intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
listA - 第一个链表
listB - 第二个链表
skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。

 

示例 1：

![](https://assets.leetcode.com/uploads/2018/12/13/160_example_1.png)

输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
— 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向相同的位置。
 

示例 2：

![](https://assets.leetcode.com/uploads/2018/12/13/160_example_2.png)

输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'
解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
示例 3：

![](http://assets.leetcode.com/uploads/2018/12/13/160_example_3.png)

输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：No intersection
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。
 

提示：

listA 中节点数目为 m
listB 中节点数目为 n
1 <= m, n <= 3 * 104
1 <= Node.val <= 105
0 <= skipA <= m
0 <= skipB <= n
如果 listA 和 listB 没有交点，intersectVal 为 0
如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]


**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 23. [反转链表](https://leetcode.cn/problems/reverse-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 

示例 1：
![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
示例 2：

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

输入：head = [1,2]
输出：[2,1]
示例 3：

输入：head = []
输出：[]
 

提示：

链表中节点的数目范围是 [0, 5000]
-5000 <= Node.val <= 5000

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 24. [回文链表](https://leetcode.cn/problems/palindrome-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

 

示例 1：

![](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

输入：head = [1,2,2,1]
输出：true
示例 2：

![](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)

输入：head = [1,2]
输出：false
 

提示：

链表中节点数目在范围[1, 105] 内
0 <= Node.val <= 9
 

进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 25. [环形链表](https://leetcode.cn/problems/linked-list-cycle/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

给你一个链表的头节点 head ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

如果链表中存在环 ，则返回 true 。 否则，返回 false 。

 

示例 1：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)


输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
示例 2：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)

输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
示例 3：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
 

提示：

链表中节点的数目范围是 [0, 104]
-105 <= Node.val <= 105
pos 为 -1 或者链表中的一个 有效索引 。

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 26. [环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改 链表。

 

示例 1：

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
示例 2：
![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)


输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
示例 3：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
 

提示：

链表中节点的数目范围在范围 [0, 104] 内
-105 <= Node.val <= 105
pos 的值为 -1 或者链表中的一个有效索引
 

进阶：你是否可以使用 O(1) 空间解决此题？

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 27. [合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

 

示例 1：

![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
示例 2：

输入：l1 = [], l2 = []
输出：[]
示例 3：

输入：l1 = [], l2 = [0]
输出：[0]
 

提示：

两个链表的节点数目范围是 [0, 50]
-100 <= Node.val <= 100
l1 和 l2 均按 非递减顺序 排列

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 28. [两数相加](https://leetcode.cn/problems/add-two-numbers/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

 

示例 1：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
示例 2：

输入：l1 = [0], l2 = [0]
输出：[0]
示例 3：

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
 

提示：

每个链表中的节点数在范围 [1, 100] 内
0 <= Node.val <= 9
题目数据保证列表表示的数字不含前导零

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 29. [删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

 

示例 1：

![](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
示例 2：

输入：head = [1], n = 1
输出：[]
示例 3：

输入：head = [1,2], n = 1
输出：[1]
 

提示：

链表中结点的数目为 sz
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
 

进阶：你能尝试使用一趟扫描实现吗？

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 30. [两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

 

示例 1：

![](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)

输入：head = [1,2,3,4]
输出：[2,1,4,3]
示例 2：

输入：head = []
输出：[]
示例 3：

输入：head = [1]
输出：[1]
 

提示：

链表中节点的数目在范围 [0, 100] 内
0 <= Node.val <= 100

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 31. [K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/description/?envType=study-plan-v2&envId=top-100-liked)[major]

给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

 

示例 1：

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg)

输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]
示例 2：

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg)

输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
 

提示：
链表中的节点数目为 n
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 

进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 32. [随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/description/?envType=study-plan-v2&envId=top-100-liked)[minor]


给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。

构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点 。

例如，如果原链表中有 X 和 Y 两个节点，其中 X.random --> Y 。那么在复制链表中对应的两个节点 x 和 y ，同样有 x.random --> y 。

返回复制链表的头节点。

用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：

val：一个表示 Node.val 的整数。
random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。
你的代码 只 接受原链表的头节点 head 作为传入参数。

 

示例 1：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/01/09/e1.png)

输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
示例 2：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/01/09/e2.png)

输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
示例 3：

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/01/09/e3.png)

输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
 

提示：

0 <= n <= 1000
-104 <= Node.val <= 104
Node.random 为 null 或指向链表中的节点。

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 33. [排序链表](https://leetcode.cn/problems/sort-list/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

 

示例 1：

![](https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg)

输入：head = [4,2,1,3]
输出：[1,2,3,4]
示例 2：

![](https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg)

输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]
示例 3：

输入：head = []
输出：[]
 

提示：

链表中节点的数目在范围 [0, 5 * 104] 内
-105 <= Node.val <= 105
 

进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 34. [合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/description/?envType=study-plan-v2&envId=top-100-liked)[major]

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

 

示例 1：

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
示例 2：

输入：lists = []
输出：[]
示例 3：

输入：lists = [[]]
输出：[]
 

提示：

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 35. [LRU 缓存](https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

 

示例：

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
 

提示：

1 <= capacity <= 3000
0 <= key <= 10000
0 <= value <= 105
最多调用 2 * 105 次 get 和 put

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 36. [二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 37. [二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 38. [翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 39. [对称二叉树](https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 40. [二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 41. [二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 42. [将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 43. [验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 44. [二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 45. [二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 46. [二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 47. [从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 48. [路径总和 III](https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 49. [二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 50. [二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

二叉树中的 `路径` 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 `至多出现一次` 。该路径 至少包含一个 `节点`，且不一定经过根节点。

`路径和` 是路径中各节点值的总和。

给你一个二叉树的根节点 `root` ，返回其 最大路径和 。



**示例 1：**
 
 ![](https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg)

>输入：root = [1,2,3]
>输出：6
>解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6

**示例 2：**

![](https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg)

>输入：root = [-10,9,20,null,null,15,7]
>输出：42
>解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 

**提示：**
- `树中节点数目范围是 [1, 3 * 10^4]`
- `-1000 <= Node.val <= 1000`


**思路**

这是一道**困难**题，但是又是经典的一看就会，一写就废

首先明确题目是需要使用递归，那么要如何递归，边界是什么
1. 对于每个节点，我们要找到包含该节点的最大路径，那么就是`当前节点的值`加上左右节点的最大路径，即：

    currNode = root->val + right + left;

2. 我们需要明确这里`left`和`right`的含义，它们表示这个节点的最大贡献，节点的最大贡献可以理解为以当前节点为起点的最大路径和

3. 对于一个节点而言，最大贡献就等于`root->val + max(left,right)`

4. 通过递归找到左右节点的最大贡献，考虑左右节点为负数的时候，我们需要丢弃掉，因此：

    left = max(dfs(root -> left), 0);
    right = max(dfs(root -> right), 0);


时间复杂度：O(N)
空间复杂度：O(N)

**代码**
``` C++ :collapsed-lines=25
#include <iostream>
#include <algorithm>
#include <climits>
#include <queue>
using namespace std;

/**
 * Definition for a binary tree node.
 */
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

/**
 * Solution class for binary tree max path sum
 */
class Solution {
public:
    int res = INT_MIN;
    
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return res;
    }

    int dfs(TreeNode* root) {
        if(!root) return 0;

        int left = max(dfs(root->left), 0);
        int right = max(dfs(root->right), 0);

        res = max(res, left + right + root->val);

        return max(left, right) + root->val;
    }
};

/**
 * Utility class for tree operations
 */
class TreeUtils {
public:
    // Create a binary tree from level order traversal
    TreeNode* createTreeFromLevelOrder(const vector<int>& nodes) {
        if (nodes.empty() || nodes[0] == INT_MIN) return nullptr;
        
        TreeNode* root = new TreeNode(nodes[0]);
        queue<TreeNode*> q;
        q.push(root);
        
        int i = 1;
        while (!q.empty() && i < nodes.size()) {
            TreeNode* current = q.front();
            q.pop();
            
            // left child
            if (i < nodes.size() && nodes[i] != INT_MIN) {
                current->left = new TreeNode(nodes[i]);
                q.push(current->left);
            }
            i++;
            
            // right child
            if (i < nodes.size() && nodes[i] != INT_MIN) {
                current->right = new TreeNode(nodes[i]);
                q.push(current->right);
            }
            i++;
        }
        
        return root;
    }
    
    // Delete tree to prevent memory leak
    void deleteTree(TreeNode* root) {
        if (!root) return;
        deleteTree(root->left);
        deleteTree(root->right);
        delete root;
    }
    
    // Print tree in level order for verification
    void printTreeLevelOrder(TreeNode* root) {
        if (!root) {
            cout << "Empty tree" << endl;
            return;
        }
        
        queue<TreeNode*> q;
        q.push(root);
        
        cout << "Tree (level order): ";
        while (!q.empty()) {
            TreeNode* current = q.front();
            q.pop();
            
            if (current) {
                cout << current->val << " ";
                if (current->left || current->right) {
                    q.push(current->left);
                    q.push(current->right);
                }
            } else {
                cout << "null ";
            }
        }
        cout << endl;
    }
};

/**
 * Test cases
 */
void runTestCases() {
    Solution solution;
    TreeUtils treeUtils;
    
    cout << "Binary Tree Maximum Path Sum - Test Cases" << endl;
    cout << "=========================================" << endl;
    
    // Test Case 1: Simple positive tree
    {
        cout << "\nTest Case 1: Simple positive tree [1,2,3]" << endl;
        vector<int> nodes = {1, 2, 3};
        TreeNode* root = treeUtils.createTreeFromLevelOrder(nodes);
        treeUtils.printTreeLevelOrder(root);
        
        int result = solution.maxPathSum(root);
        cout << "Maximum Path Sum: " << result << endl;
        cout << "Expected: 6" << endl;
        
        treeUtils.deleteTree(root);
        solution.res = INT_MIN;  // Reset for next test
    }
    
    // Test Case 2: Complex tree with negative numbers
    {
        cout << "\nTest Case 2: Complex tree [-10,9,20,null,null,15,7]" << endl;
        vector<int> nodes = {-10, 9, 20, INT_MIN, INT_MIN, 15, 7};
        TreeNode* root = treeUtils.createTreeFromLevelOrder(nodes);
        treeUtils.printTreeLevelOrder(root);
        
        int result = solution.maxPathSum(root);
        cout << "Maximum Path Sum: " << result << endl;
        cout << "Expected: 42" << endl;
        
        treeUtils.deleteTree(root);
        solution.res = INT_MIN;
    }
    
    // Test Case 3: Single node
    {
        cout << "\nTest Case 3: Single node tree [5]" << endl;
        vector<int> nodes = {5};
        TreeNode* root = treeUtils.createTreeFromLevelOrder(nodes);
        treeUtils.printTreeLevelOrder(root);
        
        int result = solution.maxPathSum(root);
        cout << "Maximum Path Sum: " << result << endl;
        cout << "Expected: 5" << endl;
        
        treeUtils.deleteTree(root);
        solution.res = INT_MIN;
    }
    
    // Test Case 4: All negative numbers
    {
        cout << "\nTest Case 4: All negative tree [-3,-1,-2]" << endl;
        vector<int> nodes = {-3, -1, -2};
        TreeNode* root = treeUtils.createTreeFromLevelOrder(nodes);
        treeUtils.printTreeLevelOrder(root);
        
        int result = solution.maxPathSum(root);
        cout << "Maximum Path Sum: " << result << endl;
        cout << "Expected: -1" << endl;
        
        treeUtils.deleteTree(root);
        solution.res = INT_MIN;
    }
    
    // Test Case 5: Complex tree
    {
        cout << "\nTest Case 5: Complex tree [5,4,8,11,null,13,4,7,2,null,null,null,1]" << endl;
        vector<int> nodes = {5, 4, 8, 11, INT_MIN, 13, 4, 7, 2, INT_MIN, INT_MIN, INT_MIN, INT_MIN, INT_MIN, 1};
        TreeNode* root = treeUtils.createTreeFromLevelOrder(nodes);
        treeUtils.printTreeLevelOrder(root);
        
        int result = solution.maxPathSum(root);
        cout << "Maximum Path Sum: " << result << endl;
        cout << "Expected: 48" << endl;
        
        treeUtils.deleteTree(root);
        solution.res = INT_MIN;
    }
    
    // Test Case 6: Tree with zeros
    {
        cout << "\nTest Case 6: Tree with zeros [0,1,1]" << endl;
        vector<int> nodes = {0, 1, 1};
        TreeNode* root = treeUtils.createTreeFromLevelOrder(nodes);
        treeUtils.printTreeLevelOrder(root);
        
        int result = solution.maxPathSum(root);
        cout << "Maximum Path Sum: " << result << endl;
        cout << "Expected: 2" << endl;
        
        treeUtils.deleteTree(root);
        solution.res = INT_MIN;
    }
    
    cout << "\n=========================================" << endl;
    cout << "All test cases completed!" << endl;
}

/**
 * Main function
 */
int main() {
    runTestCases();
    return 0;
}
```

## 51. [岛屿数量](https://leetcode.cn/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 52. [腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 53. [课程表](https://leetcode.cn/problems/course-schedule/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 54. [实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 55. [全排列](https://leetcode.cn/problems/permutations/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 56. [子集](https://leetcode.cn/problems/subsets/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 57. [电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 58. [组合总和](https://leetcode.cn/problems/combination-sum/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 59. [括号生成](https://leetcode.cn/problems/generate-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 60. [单词搜索](https://leetcode.cn/problems/word-search/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 61. [分割回文串](https://leetcode.cn/problems/palindrome-partitioning/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 62. [N 皇后](https://leetcode.cn/problems/n-queens/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 63. [搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 64. [搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 65. [在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 66. [搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 67. [寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 68. [寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 69. [有效的括号](https://leetcode.cn/problems/valid-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```


## 70. [最小栈](https://leetcode.cn/problems/min-stack/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 71. [字符串解码](https://leetcode.cn/problems/decode-string/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 72. [每日温度](https://leetcode.cn/problems/daily-temperatures/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 73. [柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 74. [数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 75. [前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 76. [数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/description/?envType=study-plan-v2&envId=top-100-liked)[major]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 77. [买卖股票的最佳时机](http://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 78. [跳跃游戏](https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 79. [跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 80. [划分字母区间](https://leetcode.cn/problems/partition-labels/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 81. [爬楼梯](https://leetcode.cn/problems/climbing-stairs/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 82. [杨辉三角](https://leetcode.cn/problems/pascals-triangle/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 83. [打家劫舍](https://leetcode.cn/problems/house-robber/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 84. [完全平方数](https://leetcode.cn/problems/perfect-squares/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 85. [零钱兑换](https://leetcode.cn/problems/coin-change/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```


## 86. [单词拆分](https://leetcode.cn/problems/word-break/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 87. [最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 88. [乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 89. [分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 90. [最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/description/?envType=study-plan-v2&envId=top-100-liked)[major]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 91. [不同路径](https://leetcode.cn/problems/unique-paths/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 92. [最小路径和](https://leetcode.cn/problems/minimum-path-sum/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 93. [最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 94. [最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 95. [编辑距离](https://leetcode.cn/problems/edit-distance/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 96. [只出现一次的数字](https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 97. [多数元素](https://leetcode.cn/problems/majority-element/description/?envType=study-plan-v2&envId=top-100-liked)[easy]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 98. [颜色分类](https://leetcode.cn/problems/sort-colors/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 99. [下一个排列](https://leetcode.cn/problems/next-permutation/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 100. [寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

```



<!-- 请完善以下代码，并补充测试用例，使得代码可以直接在本地g++编译运行
``` 
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int res = INT_MIN;
    int maxPathSum(TreeNode* root) {
        
        dfs(root);

        return res;
    }

    int dfs(TreeNode* root) {

        if(!root) return 0;

        int left = max(dfs(root -> left), 0);
        int right = max(dfs(root -> right), 0);

        res = max(res, left+right+root->val);

        return max(left, right) + root->val;
    }
};
``` -->