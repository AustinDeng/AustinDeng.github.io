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

最朴素的方法就是直接枚举，枚举数组中的每一个子数组，判断子数组的元素和是否等于k

涉及到数组求和，显然就可以利用前缀和来优化计算数组里面的元素之和


**代码**
``` C++ :collapsed-lines=25
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size();

        vector<int> v(n+1);
        v[0] = 0;
        v[1] = nums[0];
        for(int i=1; i<=n; i++) {
            v[i] = nums[i-1] + v[i-1];
        }

        int cnt = 0;
        for(int i=0; i<=n; i++) {
            for(int j=i+1; j<=n; j++) {
                if(k == (v[j] - v[i])) {cnt++;}
            }
        }
        return cnt;
    }
};
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

这个要注意审题，题目要求的是返回一个数组，数组里面的元素是每次滑动窗口移动的最大值的元素

涉及到最大值或者最小值这种，可以考虑优先队列
此外，在动态规划中，也会经常出现最大/最小或者最大的最小值/最小的最大值

对于本题，利用优化队列这个数据结构去维护滑动窗口每次移动的元素(还需要记录元素索引)

由于优先队列本来就是有序的，每次移动滑动窗口时，把元素添加到优先队列后便可以直接取队首元素即可

由于k限制了滑动窗口的长度，因此每次取队首元素加入到结果数组里面之前，都要判断一下队首元素的索引是否在有效的滑动窗口里面

**代码**
``` C++ :collapsed-lines=25
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();

        priority_queue<pair<int, int>> q;

        for(int i=0; i<k; i++) {
            q.emplace(nums[i], i);
        }

        vector<int> res;
        res.push_back(q.top().first);

        for(int i=k; i<n; i++) {
            q.emplace(nums[i], i);

            while(q.top().second <= i-k) {
                q.pop();
            }

            res.push_back(q.top().first);

        }


        return res;
    }
};
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

这道题需要用到滑动窗口，滑动窗口在字符串s上进行滑动
首先右指针一直向右移动，一直滑动到窗口内的元素全部包含字符串t中的元素
然后左指针再向右移动，直到滑动窗口内不全部包含字符串t中的元素停止移动，重复上一步

具体的，使用两个map数据结构，一个记录字符串t的元素和数量，一个记录滑动窗口内部的元素和数量
先移动右指针，每次移动都要判断滑动窗口内的元素是否全部包含字符串t中的元素，利用一个变量`valid`来记录窗口中满足字符串t的字符种类数
当滑动窗口中的元素全部包含字符串t中的元素后，再尝试移动左指针，缩小滑动窗口的长度，直到不满足全部包含字符串t中的元素为止

**代码**
``` C++ :collapsed-lines=25

class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> need, window;
        for (char c : t) need[c]++;

        int left = 0, right = 0;
        int valid = 0; // 记录窗口中满足 need 条件的字符种类数
        int start = 0, minLen = INT_MAX;

        while (right < s.size()) {
            char c = s[right];
            right++;
            if (need.count(c)) {
                window[c]++;
                if (window[c] == need[c]) {
                    valid++;
                }
            }

            while (valid == need.size()) {
                if (right - left < minLen) {
                    minLen = right - left;
                    start = left;
                }
                char d = s[left];
                left++;
                if (need.count(d)) {
                    if (window[d] == need[d]) {
                        valid--;
                    }
                    window[d]--;
                }
            }
        }
        return minLen == INT_MAX ? "" : s.substr(start, minLen);
    }
};

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

使用动态规划求解

对于每一个数组中的元素，我们要考虑是否该元素是否独立为一个子数组或者是将这个元素作为一个结果数组中的其中一个元素

设F(i)为以i结尾的连续子数组的最大和，对于nums[i]，比较{nums[i]}和{nums[i]+F(i-1)}二者的大小，F(i)应该为二者的最大值

因此状态转移方程为：
F(i) = max{nums[i], nums[i]+F(i-1)}

具体代码中，可以只用一个变量 pre 来维护对于当前 F(i) 的前一个 F(i−1) 的值，从而降低空间复杂度到 O(1)


**代码**
``` C++ :collapsed-lines=25
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int res=nums[0];
        int pre = 0;

        for(int num: nums) {
            pre = max(pre+num, num);
            res = max(res, pre);
        }

        return res;

    }
};
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

直接排序+模拟合并即可，注意一下边界条件

**代码**
``` C++ :collapsed-lines=25
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        int n = intervals.size();
        if(n ==0 ) return {};

        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for(int i=0; i<n; i++) {
            int L = intervals[i][0], R = intervals[i][1];
            if(!res.size() || res.back()[1] < L) {
                res.push_back({L, R});
            } else {
                res.back()[1] = max(res.back()[1], R);
            }

        }   
        return res;
    }
};
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

直接用取模的方式模拟，使用到额外的数组空间，朴素的方法

**代码**
``` C++ :collapsed-lines=25
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        if(k == 0) return;

        int n = nums.size();
        vector<int> v = nums;
        for(int i=0; i<n; i++) {
            nums[(i+k)%n] = v[i];
        }
    }
};
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

给定两个整数数组 `preorder` 和 `inorder` ，其中 `preorder` 是二叉树的先序遍历， `inorder` 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

**示例 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

>输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
>输出: [3,9,20,null,null,15,7]

**示例 2:**

>输入: preorder = [-1], inorder = [-1]
>输出: [-1]
 

提示:

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder 和 inorder 均 无重复 元素`
- `inorder 均出现在 preorder`
- `preorder 保证 为二叉树的前序遍历序列`
- `inorder 保证 为二叉树的中序遍历序列`


**思路**

对于任意一颗树而言，前序遍历的形式总是
```
[ 根节点, [左子树的前序遍历结果], [右子树的前序遍历结果] ]
```
即根节点总是前序遍历中的第一个节点。而中序遍历的形式总是
```
[ [左子树的中序遍历结果], 根节点, [右子树的中序遍历结果] ]
```

通过左子树的节点数，可以定位到左子树的前序遍历结果

因此我们可以得到：根节点+左子树的前序和中序+右子树的前序和中序

使用递归构建整棵树即可

时间复杂度：O(n)，其中 n 是树中的节点个数
空间复杂度：O(n)，其中 n 是树中的节点个数


**代码**
``` C++ :collapsed-lines=25

#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
#include <climits>

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

class Solution {
public:
    unordered_map<int, int> idx;

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = inorder.size();
        for (int i = 0; i < n; i++) {
            idx[inorder[i]] = i;
        }
        TreeNode* root = dfs(preorder, inorder, 0, n - 1, 0, n - 1);
        return root;
    }

    TreeNode* dfs(vector<int>& preorder, vector<int>& inorder, int pre_left, int pre_right, int in_left, int in_right) {
        // 终止条件
        if (pre_left > pre_right || in_left > in_right) {
            return nullptr;
        }
        // 构造根节点
        TreeNode* root = new TreeNode(preorder[pre_left]);

        // 找到这个根节点在中序的位置
        int curr = preorder[pre_left];
        int curr_idx = idx[curr];

        // 左子树的节点数
        int left_num = curr_idx - in_left;

        root->left = dfs(preorder, inorder, pre_left + 1, pre_left + left_num, in_left, curr_idx - 1);
        root->right = dfs(preorder, inorder, pre_left + 1 + left_num, pre_right, curr_idx + 1, in_right);

        return root;
    }
};

// 层序遍历打印二叉树（用于验证结果）
void printTree(TreeNode* root) {
    if (!root) {
        cout << "[]" << endl;
        return;
    }
    queue<TreeNode*> q;
    q.push(root);
    vector<int> res;
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        if (node) {
            res.push_back(node->val);
            q.push(node->left);
            q.push(node->right);
        } else {
            res.push_back(INT_MIN); // 用INT_MIN表示空节点
        }
    }
    // 去除末尾的空节点
    while (!res.empty() && res.back() == INT_MIN) {
        res.pop_back();
    }
    // 输出
    cout << "[";
    for (size_t i = 0; i < res.size(); i++) {
        if (res[i] == INT_MIN) {
            cout << "null";
        } else {
            cout << res[i];
        }
        if (i != res.size() - 1) {
            cout << ",";
        }
    }
    cout << "]" << endl;
}

// 测试用例
int main() {
    Solution sol;
    
    // 测试用例1: 普通二叉树
    // 前序遍历: [3,9,20,15,7]
    // 中序遍历: [9,3,15,20,7]
    // 预期树: [3,9,20,null,null,15,7]
    vector<int> preorder1 = {3, 9, 20, 15, 7};
    vector<int> inorder1 = {9, 3, 15, 20, 7};
    TreeNode* root1 = sol.buildTree(preorder1, inorder1);
    cout << "Test case 1: ";
    printTree(root1);
    
    // 测试用例2: 单节点
    vector<int> preorder2 = {1};
    vector<int> inorder2 = {1};
    TreeNode* root2 = sol.buildTree(preorder2, inorder2);
    cout << "Test case 2: ";
    printTree(root2);
    
    // 测试用例3: 左斜树
    // 前序遍历: [1,2,3]
    // 中序遍历: [3,2,1]
    // 预期树: [1,2,null,3]
    vector<int> preorder3 = {1, 2, 3};
    vector<int> inorder3 = {3, 2, 1};
    TreeNode* root3 = sol.buildTree(preorder3, inorder3);
    cout << "Test case 3: ";
    printTree(root3);
    
    // 测试用例4: 右斜树
    // 前序遍历: [1,2,3]
    // 中序遍历: [1,2,3]
    // 预期树: [1,null,2,null,3]
    vector<int> preorder4 = {1, 2, 3};
    vector<int> inorder4 = {1, 2, 3};
    TreeNode* root4 = sol.buildTree(preorder4, inorder4);
    cout << "Test case 4: ";
    printTree(root4);
    
    // 测试用例5: 空树
    vector<int> preorder5 = {};
    vector<int> inorder5 = {};
    TreeNode* root5 = sol.buildTree(preorder5, inorder5);
    cout << "Test case 5: ";
    printTree(root5);
    
    return 0;
}

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

## 62. [N 皇后](https://leetcode.cn/problems/n-queens/description/?envType=study-plan-v2&envId=top-100-liked)[major]

按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

`n 皇后问题` 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 `n` ，返回所有不同的 `n 皇后问题` 的解决方案。

每一种解法包含一个不同的 `n 皇后问题` 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。


**示例 1：**

![](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

>输入：n = 4
>输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
>解释：如上图所示，4 皇后问题存在两个不同的解法。

**示例 2：**

>输入：n = 1
>输出：[["Q"]]
 

**提示：**

- `1 <= n <= 9`

**思路**

用模拟法直接套回溯的模板就行

创建一个nxn的棋盘，然后依次校验每个位置是否可以放得下一个皇后

回溯的核心代码是这个：

``` C++
for (int i = 0; i < n; i++) {
    if (!isValid(board, row, i)) {
        continue;
    }
    board[row][i] = 'Q';
    dfs(board, row + 1, n);
    board[row][i] = '.';
}
```

时间复杂度： O(n!×n)
空间复杂度：O(n)

n是皇后的数量



**代码**
``` C++ :collapsed-lines=25
#include <vector>
#include <string>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<vector<string>> res;
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        dfs(board, 0, n);
        return res;
    }

    void dfs(vector<string>& board, int row, int n) {
        if (row == n) {
            res.push_back(board);
            return;  // 返回上一层
        }

        for (int i = 0; i < n; i++) {
            if (!isValid(board, row, i)) {
                continue;
            }
            board[row][i] = 'Q';
            dfs(board, row + 1, n);
            board[row][i] = '.';
        }
    }

    bool isValid(vector<string>& board, int row, int col) {
        int n = board.size();
        // 检查同一列
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q') {
                return false;
            }
        }
        // 检查右上斜线
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }
        // 检查左上斜线
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }
        return true;
    }
};

// 测试函数
int main() {
    Solution sol;
    int n = 4;
    vector<vector<string>> result = sol.solveNQueens(n);
    cout << "n = " << n << " 的解法有 " << result.size() << " 种：" << endl;
    for (int i = 0; i < result.size(); i++) {
        cout << "解法 " << i + 1 << ":" << endl;
        for (const string& row : result[i]) {
            cout << row << endl;
        }
        cout << endl;
    }
    return 0;
}
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

给你一个整数 `n` ，返回 和为 `n` 的完全平方数的最少数量 。

`完全平方数` 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，`1`、`4`、`9` 和 `16` 都是完全平方数，而 `3` 和 `11` 不是。

 

**示例 1：**
>输入：n = 12
>输出：3 
>解释：12 = 4 + 4 + 4

**示例 2：**
>输入：n = 13
>输出：2
>解释：13 = 4 + 9
 
**提示：**

- `1 <= n <= 10^4`

**思路**

我使用的是动态规划实现的

设dp[n]表示最少需要多少个数的平方来表示整数 n
那么我们在`1...n`中枚举`j`,那么j的平方数就是`j*j`，当`j*j<n`时,还需要`n-j*j`才能够到`n`
于是问题就变成：求`n-j*j`的最少完全平方数

典型的大问题转换成同等的小问题，状态转移方程：`dp[n] = 1 + min{j=1..x}dp[n-j*j]`,其中`x表示根号下n`


**代码**
``` C++ :collapsed-lines=25
#include <iostream>
#include <vector>
#include <climits>
#include <cmath>
using namespace std;

class Solution {
public:
    int numSquares(int n) {
        if (n <= 0) return 0;
        
        vector<int> dp(n + 1, 0);
        
        for (int i = 1; i <= n; i++) {
            int curr = INT_MAX;
            
            for (int j = 1; j * j <= i; j++) {
                curr = min(curr, dp[i - j * j]);
            }
            
            dp[i] = 1 + curr;
        }
        
        return dp[n];
    }
};

// 更高效的解法（使用静态变量）
class Solution2 {
public:
    int numSquares(int n) {
        static vector<int> dp({0});
        
        if (n < dp.size()) {
            return dp[n];
        }
        
        // 扩展dp数组
        for (int i = dp.size(); i <= n; i++) {
            int curr = INT_MAX;
            for (int j = 1; j * j <= i; j++) {
                curr = min(curr, dp[i - j * j]);
            }
            dp.push_back(1 + curr);
        }
        
        return dp[n];
    }
};

// 四平方定理解法（更高效）
class Solution3 {
public:
    int numSquares(int n) {
        // 先检查是否满足四平方定理的特殊情况
        // 1. 如果n是平方数，返回1
        int sqrt_n = sqrt(n);
        if (sqrt_n * sqrt_n == n) {
            return 1;
        }
        
        // 2. 检查是否满足n = 4^a*(8b+7)，即返回3
        int temp = n;
        while (temp % 4 == 0) {
            temp /= 4;
        }
        if (temp % 8 == 7) {
            return 4;
        }
        
        // 3. 检查是否是两个平方数之和
        for (int i = 1; i * i <= n; i++) {
            int j = n - i * i;
            int sqrt_j = sqrt(j);
            if (sqrt_j * sqrt_j == j) {
                return 2;
            }
        }
        
        // 4. 否则返回3
        return 3;
    }
};

// 测试函数
void testSolution() {
    Solution sol;
    Solution2 sol2;
    Solution3 sol3;
    
    vector<pair<int, int>> test_cases = {
        {1, 1},    // 1 = 1^2
        {2, 2},    // 2 = 1^2 + 1^2
        {3, 3},    // 3 = 1^2 + 1^2 + 1^2
        {4, 1},    // 4 = 2^2
        {5, 2},    // 5 = 1^2 + 2^2
        {6, 3},    // 6 = 1^2 + 1^2 + 2^2
        {7, 4},    // 7 = 1^2 + 1^2 + 1^2 + 2^2
        {8, 2},    // 8 = 2^2 + 2^2
        {9, 1},    // 9 = 3^2
        {10, 2},   // 10 = 1^2 + 3^2
        {12, 3},   // 12 = 2^2 + 2^2 + 2^2
        {13, 2},   // 13 = 2^2 + 3^2
        {16, 1},   // 16 = 4^2
        {17, 2},   // 17 = 1^2 + 4^2
        {18, 2},   // 18 = 3^2 + 3^2
        {19, 3},   // 19 = 1^2 + 3^2 + 3^2
        {20, 2},   // 20 = 2^2 + 4^2
        {48, 3},   // 48 = 4^2 + 4^2 + 4^2
        {100, 1},  // 100 = 10^2
        {101, 2},  // 101 = 1^2 + 10^2
        {102, 3},  // 102 = 1^2 + 1^2 + 10^2
        {103, 4},  // 103 = 1^2 + 1^2 + 1^2 + 10^2
    };
    
    cout << "测试动态规划解法（Solution）:" << endl;
    for (const auto& test_case : test_cases) {
        int n = test_case.first;
        int expected = test_case.second;
        int result = sol.numSquares(n);
        cout << "numSquares(" << n << ") = " << result 
             << " (期望: " << expected << ")" 
             << (result == expected ? " ✓" : " ✗") << endl;
    }
    
    cout << "\n测试带缓存的解法（Solution2）:" << endl;
    for (const auto& test_case : test_cases) {
        int n = test_case.first;
        int expected = test_case.second;
        int result = sol2.numSquares(n);
        cout << "numSquares(" << n << ") = " << result 
             << (result == expected ? " ✓" : " ✗") << endl;
    }
    
    cout << "\n测试四平方定理解法（Solution3）:" << endl;
    for (const auto& test_case : test_cases) {
        int n = test_case.first;
        int expected = test_case.second;
        int result = sol3.numSquares(n);
        cout << "numSquares(" << n << ") = " << result 
             << (result == expected ? " ✓" : " ✗") << endl;
    }
    
    // 测试一些大数字
    cout << "\n测试大数字的性能对比:" << endl;
    vector<int> large_numbers = {1000, 10000, 100000};
    
    for (int n : large_numbers) {
        cout << "\nn = " << n << ":" << endl;
        
        // 使用动态规划解法
        clock_t start = clock();
        int result1 = sol.numSquares(n);
        clock_t end = clock();
        double time1 = double(end - start) / CLOCKS_PER_SEC;
        cout << "  动态规划解法: " << result1 << " (耗时: " << time1 << "秒)" << endl;
        
        // 使用带缓存的解法
        start = clock();
        int result2 = sol2.numSquares(n);
        end = clock();
        double time2 = double(end - start) / CLOCKS_PER_SEC;
        cout << "  带缓存解法: " << result2 << " (耗时: " << time2 << "秒)" << endl;
        
        // 使用四平方定理解法
        start = clock();
        int result3 = sol3.numSquares(n);
        end = clock();
        double time3 = double(end - start) / CLOCKS_PER_SEC;
        cout << "  四平方定理解法: " << result3 << " (耗时: " << time3 << "秒)" << endl;
    }
}

int main() {
    cout << "========== 完全平方数问题测试 ==========" << endl;
    cout << "问题描述：给定正整数n，找到若干个完全平方数（如1,4,9,16,...）" << endl;
    cout << "使得它们的和等于n。你需要让组成和的完全平方数的个数最少。" << endl;
    cout << "======================================" << endl << endl;
    
    testSolution();
    
    // 交互式测试
    cout << "\n========== 交互式测试 ==========" << endl;
    Solution sol;
    int n;
    while (true) {
        cout << "\n请输入一个正整数（输入0退出）: ";
        cin >> n;
        
        if (n == 0) {
            cout << "程序结束！" << endl;
            break;
        }
        
        if (n < 0) {
            cout << "请输入正整数！" << endl;
            continue;
        }
        
        int result = sol.numSquares(n);
        cout << n << " 最少需要 " << result << " 个完全平方数" << endl;
        
        // 显示如何组合
        cout << "可能的组合方式: ";
        int temp = n;
        while (temp > 0) {
            // 找到最大的平方数
            for (int j = sqrt(temp); j >= 1; j--) {
                int square = j * j;
                if (sol.numSquares(temp - square) + 1 == result) {
                    cout << square;
                    temp -= square;
                    if (temp > 0) cout << " + ";
                    break;
                }
            }
        }
        cout << " = " << n << endl;
    }
    
    return 0;
}
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
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n+1);

        for(int i=1; i<=n; i++) {
            int curr = INT_MAX;

            for(int j=1; j*j <=i; j++) {
                curr = min(curr, dp[i-j*j]);
            }



            dp[i] = 1 + curr;
        }


        return dp[n];
    }
};
``` -->