/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    var temp = []
    for (var i = 0; i < nums.length; i++) {
        var _index = nums.indexOf(target - nums[i], i + 1);
        if (_index > -1) {
            temp.push(i, _index)
        }
    }
    return temp;
};