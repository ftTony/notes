/** 
单链表
*/

function LinkedList() {
  var Node = function(element) {
    this.element = element
    this.next = null
  }

  var length = 0
  var head = null

  this.append = function(element) {
    var node = new Node(element),
      current

    if (head === null) {
      // 列表中第一个节点
      head = node
    } else {
      current = head

      // 循环列表，直到找到最后一项
      while (current.next) {
        current = current.next
      }

      // 找到最后一项，将其next赋为node，建立链接
      current.next = node
    }

    length++ // 更新列表的长度
  }
  this.insert = function(position, element) {
    // 检查越界值
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0
      if (position === 0) {
        // 在第一个位置添加

        node.next = current
        head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }

      length++
      return true
    } else {
      return false
    }
  }
  this.removeAt = function(position) {
    // 检查越界值
    if (position > -1 && position < length) {
      var current = head,
        previous,
        index = 0

      // 移除第一项
      if (position === 0) {
        head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        // 将previous与current的下一项链接起来：路过current，从而移除它
        previous.next = current.next
      }
      length--

      return current.element
    } else {
      return null
    }
  }
  this.remove = function(element) {
    var index = this.indexOf(element)
    return this.removeAt(index)
  }
  this.indexOf = function(element) {
    var current = head,
      index = -1

    while (current) {
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  this.isEmpty = function() {
    return length === 0
  }
  this.size = function() {
    return length
  }
  this.getHead = function() {
    return head
  }
  this.toString = function() {
    var current = head,
      string = ''

    while (current) {
      string = current.element
      current = current.next
    }
    return string
  }
}
