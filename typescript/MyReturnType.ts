// infer R 代表让 TS 自动推导类型存入 R，只能在 extends 的后面、true 分支使用。

// 基础示例：提取函数返回值
type MyReturnType<T> = T extends (...args: any[]) => infer ReturnVal ? ReturnVal : never;

function hello(): string {
    return "Hello, World!";
}

type Res = MyReturnType<typeof hello>; // Res will be of type string