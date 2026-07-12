type NumLike = number | string;
const add = <T extends NumLike | string, U extends NumLike>(a: T, b: T): number => {
    return Number(a) + Number(b);
}

function add1<T extends NumLike, U extends NumLike>(a: T, b: T): number {
    const n1 = parseFloat(String(a));
    const n2 = parseFloat(String(b));
    return n1 + n2;
}