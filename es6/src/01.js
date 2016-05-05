// console.log(0b111110111 === 503);
// console.log(Number.isFinite(15));
// console.log(Number.isFinite(true));

// function log (x,y='World') {
// 	console.log(x,y);
// }

// log('Hello');
// log('Hello','China');
// log('Hello','');

// function foo ({x,y=5}) {
// 	console.log(x,y);
// }

// foo({});
// foo({x:1});
// foo({x:1,y:2});
// foo();

// function fetch (url,{method='GET'}={}) {
// 	console.log(method);
// }

// fetch('http://futu5.com');

// function m1 ({x=0,y=0}={}) {
// 	return [x,y];
// }

// function m2 ({x,y}={x:0,y:0}) {
// 	return [x,y];
// }

// console.log(m1());
// console.log(m2());

// console.log(m1({x:3,y:8}));
// console.log(m2({x:3,y:8}));

// function f (x=1,y) {
// 	return [x,y];
// }

// console.log(f());
// console.log(f(2));
// console.log(f(,1));


// let x=1;

// function f (y=x) {
// 	let x=2;
// 	console.log(y);
// }

// f();

// function* helloWorldGenerator () {
// 	yield 'hello';
// 	yield 'World';
// 	return 'ending';
// }

// var hw=helloWorldGenerator();

// console.log(hw.next());

// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

var arr=[1,[[2,3],4],[5,6]];

var flat=function* (a) {
	var length=a.length;
	for (var i = 0; i < length; i++) {
		var item=a[i];
		if (typeof item!=='number') {
			yield* flat(item);
		}else{
			yield item;
		}
	};
}

for (var f of flat(arr)) {
	console.log(f);
};




