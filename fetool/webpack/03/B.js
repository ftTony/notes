import A from './A';
class B extends A {
    constructor() {
        super();
        super.a();
    }
}
export default B;