import {hello} from './hello';
import {name} from './name.js';

export default function message(){
    console.log(`${hello} ${name}!`);
}