// 获取函数参数类型

type MyParameters<T> = T extends (...args: infer Params) => any ? Params : never;

type P = MyParameters<(name: string, age: number) => void>; // P will be of type [string, number]

// 提取数组元素类型
type FirstItem<T> = T extends [infer First, ...any[]] ? First : never;

type First = FirstItem<[1, 2, 3]>; // First will be of type 1

// 获取最后一项
type LastItem<T> = T extends [...any[], infer Last] ? Last : never;

type Last = LastItem<[1, 2, 3]>; // Last will be of type 3

type ShiftArr<T> = T extends [any, ...infer Rest] ? Rest : never;

// 拿到 Promise 包裹里面的类型
type UnPromise<T> = T extends Promise<infer Inner> ? Inner : T;

type A = UnPromise<Promise<number>>; // A will be of type number
type B = UnPromise<string>; // B will be of type string

type DeepUnPromise<T> = T extends Promise<infer U> ? DeepUnPromise<U> : T;

type N = UnPromise<Promise<Promise<number>>>; // A will be of type number

// 提取对象值类型
type ValueType<T> = T extends Record<string, infer V> ? V : never;
type V = ValueType<{ a: number, b: string }>; // V will be of type number | string
