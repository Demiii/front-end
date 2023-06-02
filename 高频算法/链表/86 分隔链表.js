var partition = function(head, x) {
  let dummy1 = head1 = {val: -1, next: null}
  let dummy2 = head2 = {val: -1, next: null}
  while(head) {
    if(head.val < x) {
      head1.next = head
      head1 = head1.next
    }else {
      head2.next = head
      head2 = head2.next
    }
    head = head.next
  }
  head1.next = dummy2.next
  head2.next = null
  return dummy1.next
}