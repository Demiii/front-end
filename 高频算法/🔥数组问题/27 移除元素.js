var removeElement = function(nums, val) {
  let slow = fast = 0
  while(fast < nums.length) {
    if(nums[fast] != val) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  nums.splice(slow)
};