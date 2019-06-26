const show=require('./show.js');
import MyImage from './Myimage.jpg'
import { a } from './util';
a();
require('./main.css');
show('Webpack');
function* g() {
	yield 'a';
	yield 'b';
	yield 'c';
	return 'ending';
  }
  
  var gen = g();
  console.log(gen.next()); // 返回Object {value: "a", done: false}
  
  for(let a of [1,2,3,4]) {
	console.log(a); // 打印出 1, 2, 3, 4
  }

  console.log('asdf');