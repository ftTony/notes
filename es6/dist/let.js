"use strict";

//if (true) {
//    console.log(Max);
//    let Max = 5;
//}


//var a=[];
//
//for(let i=0;i<10;i++){
//    a[i]=function(){
//        console.log(i);
//    };
//}
//
//a[6]();

//function fl(){
//    let n=5;
//    if(true){
//        let n=10;
//    }
//    console.log(n);
//}
//
//fl();

/*let [a,b,c]=[1,2,3];
console.log(a);
console.log(b);
console.log(c);*/

/*let [foo,[[bar],baz]]=[1,[[2],3]];

console.log(foo);
console.log(bar);
console.log(baz);*/

/*let [x,y,z]=new Set(['a','b','c']);
console.log(x);*/

//默认值

//let [foo=true]=[];
//console.log(foo);
//
//let [x,y='b']=['a'];
//console.log(y);
//let [x,y='b']=['a',undefined];
//console.log('x'+x);
//console.log('y'+y);

/*var arr=[[1,2],[3,4]].map(([a,b])=>a+b);
console.log(arr);*/

//let hello="\u{41}\u{42}\u{43}";
//
//console.log(hello);

/*for(let codePoint of 'foo'){
 console.log(codePoint);
}*/

/*var text=String.fromCodePoint(0x20BB7);

for(let i=0;i<text.length;i++){
 console.log(text[i]);
}

for(let i of text){
 console.log(i);
}*/

/*var s='Hello world';

s.startsWith('Hello');
s.endWith('!');
s.includes('o');*/

/*'x'.repeat(3);
'hello'.repeat(2);
'na'.repeat(0);*/
/*

const tmpl=addrs=>`
 <table>
     ${addrs.map(addr=>`
     <tr><td>${addr.first}</td></tr>
     <tr><td>${addr.last}</td></tr>
     `).join('')}
 </table>
`;

const data=[
 {first:'<Jane>',last:'Bond'},
 {first:'Lars',last:'<Croft>'},
];

console.log(tmpl(data));*/

/*
var a=5;
var b=10;

function tag(s,v1,v2){
 console.log(s[0]);
 console.log(s[1]);
 console.log(s[2]);
 console.log(v1);
 console.log(v2);
 return 'OK';
}

tag`Hello ${a+b} world ${a*b}`;
*/

//console.log(Math.trunc(4.1));

/*let arrayLike={
 '0':'a',
 '1':'b',
 '2':'c',
 length:3
};

let arr2=Array.from(arrayLike);

console.log(arr2);*/

//console.log(Array.from('hello'));


//for (let elem of ['a', 'b'].values()) {
// console.log(elem);
//}

//[1,2,3].includes(2);

/*function foo({x,y=5}){
 console.log(x,y);
}

foo({});
foo({x:1});
foo({x:1,y:2});
foo();*/

/*
function f(x=1,y){
 return [x,y];
}

f();
f(2);
console.log(f(undefined,1));*/

/*
 function f(x,y=x){
 console.log(y);
 }

 f(2);
 */
/*

let foo='outer';

function bar(func=x=>foo){
 let foo='inner';
 console.log(func());
}

bar();*/

/*
var x=1;

function foo(x,y=function(){x=2;}){
 var x=3;
 y();
 console.log(x);
}

foo();
console.log(x);*/

/*
function push(array,...items){
 items.forEach(function(item){
  array.push(item);
  console.log(item);
 });
}

var a=[];
push(a,1,2,3);*/

/*
const s=new Set();

[2,3,5,4,5,2,2].forEach(x=> s.add(x));

for(let i of s){
 console.log(i);
}*/

var set = new Set([1, 2, 3, 4, 5]);
console.log(set);