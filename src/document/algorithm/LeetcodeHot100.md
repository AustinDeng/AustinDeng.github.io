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

这题很明显用双指针一前一后找到最大的盛水量的索引就
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

给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

**示例 1:**
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]

**示例 2:**
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
 

**提示：**
1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
0 <= k <= 105

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 16. [除了自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除了 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请 不要使用除法，且在 O(n) 时间复杂度内完成此题。

**示例 1:**
输入: nums = [1,2,3,4]
输出: [24,12,8,6]

**示例 2:**
输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]
 

**提示：**
2 <= nums.length <= 105
-30 <= nums[i] <= 30
输入 保证 数组 answer[i] 在  32 位 整数范围内

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 17. [缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/description/?envType=study-plan-v2&envId=top-100-liked)[major]

给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

**示例 1：**
输入：nums = [1,2,0]
输出：3
解释：范围 [1,2] 中的数字都在数组中。

**示例 2：**
输入：nums = [3,4,-1,1]
输出：2
解释：1 在数组中，但 2 没有。

**示例 3：**
输入：nums = [7,8,9,11,12]
输出：1
解释：最小的正数 1 没有出现。
 

**提示：**
1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 18. [矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

**示例 1：**
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]

**示例 2：**
输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 

**提示：**
m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-231 <= matrix[i][j] <= 231 - 1

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 19. [螺旋矩阵]https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

**示例 1：**
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]

**示例 2：**
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 

**提示：**
m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100

**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 20. [旋转图像](https://leetcode.cn/problems/rotate-image/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

**示例 1：**
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]

**示例 2：**
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

**提示：**
n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
**思路**

**代码**
``` C++ :collapsed-lines=25

```

## 21. [搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked)[minor]

编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 

**示例 1：**
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true

**示例 2：**
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false

**提示：**
m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-109 <= matrix[i][j] <= 109
每行的所有元素从左到右升序排列
每列的所有元素从上到下升序排列
-109 <= target <= 109

**思路**

**代码**
``` C++ :collapsed-lines=25

```





<!-- ## 1. [两数之和](https://leetcode.cn/problems/two-sum/description/)[minor]

**思路**

**代码**
``` C++ :collapsed-lines=25

``` -->

<!-- 请完善以下代码，并补充测试用例，使得代码可以直接在本地g++编译运行
``` 
class Solution {
public:
    int maxArea(vector<int>& height) {
        int i=0, j=height.size()-1;
        int res = 0;

        while(i<j) {
            int curr = min(height[i], height[j]) * (j-i);
            res = max(res, curr);

            if(height[i] <= height[j]) {
                i++;
            } else {
                j--;
            }
        }

        return res;
    }
};
``` -->