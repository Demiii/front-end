var removeDuplicates = function(nums) {
  let slow = 0, fast = 1
  if(nums.length <= 1) {
    return nums
  }
  while(fast <= nums.length - 1){
    // 不重复
    if(nums[fast] != nums[fast-1]) {
      // 之前有重复的
      if(fast-slow > 1) {
        nums[slow+1] = nums[fast]
      }
      slow++
      fast++
    }
    // 重复
    else{
      fast++
    }
  }
  nums.splice(slow+1)
  return nums
};