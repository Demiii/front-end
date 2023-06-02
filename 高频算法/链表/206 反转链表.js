/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let next = null
  let cur = head
  let pre = head
  while(pre) {
    pre = pre.next
    cur.next = next
    next = cur
    cur = pre
  }
  return next
};