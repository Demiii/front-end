/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let point1 = headA, point2 = headB
  while(point1 != point2) {
  // 如果两条最终都指向null,说明没有交点
    if(point1.next == null && point2.next == null) {
      return null
    }
    if(point1.next == null) {
      point1 = headB
    }else{
      point1 = point1.next
    }
    if(point2.next == null) {
      point2 = headA
    }else{
      point2 = point2.next
    }
  }
  return point1
};