// 快慢指针，快的是慢的两倍速度，所以快的到达尾结点，慢的就到中间
var middleNode = function(head) {
  let slow = head
  let fast = head
  while(fast.next) {
    if(fast.next.next) {
      fast = fast.next.next
    }else {
      fast = fast.next
    }
    slow = slow.next
  }
  return slow
};