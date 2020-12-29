/**
 * 链表反转
 * 参考https://github.com/sisterAn/JavaScript-Algorithms/issues/14
 */

 var reverseList = function(head){
     if(!head || !head.next) return head;
     var prev = null,curr = head;
     while(curr){
         var next = curr.next;
         prev = curr;
         curr = next;
     }
     head = prev;
     return head;
 }
 