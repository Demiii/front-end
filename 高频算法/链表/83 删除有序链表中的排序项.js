var deleteDuplicates = function(head) {
  if(!head || !head.next) return head
  let slow = head, fast = head.next
  while(fast){
    if(fast.val != slow.val) {
      slow.next = fast
      slow = slow.next
    }
    fast = fast.next
  }
  slow.next = null
  return head
};