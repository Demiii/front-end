// 找倒数第n个的前一个，但是这个有可能没有，如果没有，代表链表长度为n，删除倒数第n个就是删除第一个
// 找到倒数第n个的思路，双指针，先找到第n个，然后同时移动两个指针，知道后面的指针指向尾结点，则第一个指针就是倒数第n个值指针
var removeNthFromEnd = function(head, n) {
  let startPoint = head
  let endPoint = head
  let tempIndex = 1
  // 找到倒数第n+1个节点, 先找到正数第n+1个
  while(tempIndex < n+1) { 
    endPoint = endPoint.next
    tempIndex++
  }
  if(!endPoint) return head.next
  while(endPoint.next) {
    startPoint = startPoint.next
    endPoint = endPoint.next
  }
  startPoint.next = startPoint.next.next
  return head
};