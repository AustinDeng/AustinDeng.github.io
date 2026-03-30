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
``` C++
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

``` C++
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


<!-- ## 1. [两数之和](https://leetcode.cn/problems/two-sum/description/)[minor]

**思路**

**代码**
``` C++

``` -->

<!-- 请完善以下代码，并补充测试用例，使得代码可以直接在本地g++编译运行
```
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> s;
        for(const int& i: nums) {
            s.insert(i);
        }

        int res=0;
        for(const int& i:s) {
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
``` -->