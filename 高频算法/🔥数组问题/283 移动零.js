// 方法一： 把非零的移到前面，然后把后面的替换为0
var moveZeroes = function(nums) {
  let slow = fast = 0
  while(fast < nums.length) {
    if(nums[fast] == 0) {
      fast++
    }else{
      nums[slow] = nums[fast]
      slow++
      fast++
    }
  }
  nums.splice(slow, nums.length-slow, ...Array.prototype.fill.call(new Array(nums.length-slow), 0))
};