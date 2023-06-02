// 二分，两两一组合并，直到lists只有一条链表时
var mergeKLists = function(lists) {
  if(lists.length == 0) return null
  if(lists.length == 1) return lists[0]
  let newList = []
  let curIndex = 0
  while(curIndex < lists.length) {
    // 单数跳过
    if(curIndex%2) {
      curIndex++
      continue
    }
    if(!lists[curIndex+1]) {
      newList.push(lists[curIndex])
    }else {
      newList.push(sortF(lists[curIndex], lists[curIndex+1]))
    }
    curIndex++
  }
  return mergeKLists(newList)
};

// 两个链表升序合并
var sortF = function(l1, l2) {
  let dummy = head = {val : -1, next: null} 
  while(l1 && l2) {
    if(l1.val < l2.val) {
      head.next = l1
      l1 = l1.next
      head = head.next
    }else {
      head.next = l2
      l2 = l2.next
      head = head.next
    }
  }
  if(l1) {
    head.next = l1
  }
  if(l2) {
    head.next = l2
  }
  return dummy.next
}