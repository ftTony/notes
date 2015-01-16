/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    var str = '' // 存放无重复子串
    var size = 0 //  当前最长无重复子串的长度
    for (var i = 0, len = s.length; i < len; i++) {
        var char = s.charAt(i)
        var index = str.indexOf(char)
        if (index == -1) {
            str += char
            size = size < str.length ? str.length : size
        } else {
            str = str.substr(index + 1) + char
        }
    }
    return size
};
// @lc code=end