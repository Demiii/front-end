var mergeTwoLists = function(l1, l2) {
  let temp = {val: -1, next: null}
  let newl = temp
  while(l1 && l2) {
    if(l1.val >= l2.val) {
      newl.next = l2
      l2 = l2.next
    }else{
      newl.next = l1
      l1 = l1.next
    }
    newl = newl.next
  }
  if(l1) newl.next = l1
  if(l2) newl.next = l2
  return temp.next
};