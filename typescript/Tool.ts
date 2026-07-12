interface User {
    name: string;
    age: number;
    address: string;
}

// 从类型Type中选择一组属性Keys来创建类型。
type NameAndAgeOnly = Pick<User, "name" | "age">;
const nameAndAge: NameAndAgeOnly = { name: "John", age: 30 }

// 模拟实现
type MyPicker<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 构造一个对象类型，其属性键为keys，属性值为Type。
type UserName = "xiaoming" | "xiaohong" | "xiaogang";
const users: Record<UserName, User> = {
    xiaoming: { name: "xiaoming", age: 20, address: "beijing" },
    xiaohong: { name: "xiaohong", age: 21, address: "shanghai" },
    xiaogang: { name: "xiaogang", age: 22, address: "guangzhou" },
}

// 模拟实现
type MyRecord<K extends keyof any, T> = {
    [P in K]: T;
}

// 从联合类型UnionType中排除ExcludedMembers类型然后返回一个新类型。
type UserExcludeAddress = Exclude<keyof User, "address">; // "name" | "age"

// 模拟实现
type MyExclude<T, U> = T extends U ? never : T;

// 从联合类型Type中提取Union类型然后返回一个新类型。
type UserExtractAddress = Extract<keyof User, "address">; // "address"

// 模拟实现
type MyExtract<T, U> = T extends U ? T : never;

// 与Pick相反，Omit是从Type中选取所有Keys属性然后删除构造一个新类型。
type UserOmitAge = Omit<User, "age">; // { name: string; address: string; }

// 模拟实现
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 通过从Type中排除null和undefined 来构造一个类型。
type PortNumber = string | number | null | undefined;
type ServerPortNum = NonNullable<PortNumber>; // string | number

type MyNonNullable<T> = T extends null | undefined ? never : T;

// 获取Promise中的类型(如await、then方法返回的被Promise包裹的数据的类型)。适合处理异步操作并确保解析值的类型安全。
type C = Awaited<Promise<string>>; // A will be of type string
type D = Awaited<Promise<Promise<number>>>; // B will be of type number

const fetchUser = async (): Promise<User> => {
    const data = await fetch("https://api.example.com/user");
    return data.json();
}

type UserFetch = Awaited<ReturnType<typeof fetchUser>>; // UserFetch will be of type User

async function getUserInfo() {
    let user: UserFetch = { name: "John", age: 30, address: "123 Main St" };
    return user;
}

// 描述只能读的数组， 不可进行添加、删除、替换操作。
const foo = (arr: ReadonlyArray<string>): void => {
    arr.slice(); // okay
    // arr.push("hello!"); //  Type error
    // arr.pop(); // Type error
    // arr.splice(1, 1); // Type error
    // arr[0] = 'aa' // Type error
}

// 将字符串中的每个字符转换为对应的大写。
type Greeting = "hello world";
type UppercaseGreeting = Uppercase<Greeting>; // "HELLO WORLD"

// 将字符串中的每个字符转换为对应的小写。
type Greeting2 = "HELLO WORLD";
type LowercaseGreeting = Lowercase<Greeting2>; // "hello world"

// 将字符串中的第一个字符转换为大写字母。
type Greeting3 = "hello world";
type CapitalizedGreeting = Capitalize<Greeting3>; // "Hello world"

// 将字符串中的第一个字符转换为小写字母。
type Greeting4 = "Hello World";
type UncapitalizedGreeting = Uncapitalize<Greeting4>; // "hello World"