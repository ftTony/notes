# 深入理解 Promise (中)

这一篇让我们深入源码层面，一步一步去封装一个Promise，去了解Promise的内部实现，以便我们在项目中对Promise的使用运用自如。

* 实现一个简单的 Promise工具类

	* 	Promise类的结构
	* 	构造器的初始化
	* 	then方法
	* 	catch方法

* 添加扩展功能函数

	* all
	* race
	* resolve
	* reject
	* wait
	* stop
	* always
	* done
	* defer
	* timeout
	* sequence
	
* 测试
* 源码

我在想去自己实现一个Promise类库的时候，首先会去找一些比较简洁又符合标准的一些相关实现，去分析其源码，然后结合几种实现的优点总结出自己的版本，站在巨人的肩膀上让我直接取道直径，快速的实现了我的目标，在这里非常感谢前辈们的努力和给我们留下的宝贵知识财富。

从标准中寻找蛛丝马迹 (以下所说的 标准 均以 [Promise/A+](https://promisesaplus.com/) 做为参考)，我们将依据标准，编写一个可通过标准测试的Promise类库。

## Promise类的结构

标准中规定：

1. Promise对象初始状态为 Pending，在被 resolve 或 reject 时，状态变为 Fulfilled 或 Rejected
1. resolve接收成功的数据，reject接收失败或错误的数据
1. Promise对象必须有一个 then 方法，且只接受两个可函数参数 onFulfilled、onRejected