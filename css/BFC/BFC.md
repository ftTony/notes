BFC全称是Block Formatting Context，即块格式化上下文。它是CSS2.1规范定义的，关于CSS渲染定位的一个概念。

BFC是页面CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。

BFC的一个最重要的效果是，让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

利用BFC可以闭合浮动，防止与浮动元素重叠。

BFC的创建方法：浮动 (元素的float不为none)、绝对定位元素 (元素的position为absolute或fixed)、行内块inline-blocks(元素的 display: inline-block)、表格单元格(元素的display: table-cell，HTML表格单元格默认属性)、overflow的值不为visible的元素、弹性盒 flex boxes (元素的display: flex或inline-flex)；


参考资料：

[http://elcarim5efil.github.io/blog/2015/08/20/Learning_BFC.html](http://elcarim5efil.github.io/blog/2015/08/20/Learning_BFC.html)