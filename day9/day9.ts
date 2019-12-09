

import * as fs from 'fs';
import {intcomp} from '../intcomp';

var input: Array<string> = fs.readFileSync('./day9/day9_input.txt').toString().trim().split(',');

let comp = new intcomp(input);
comp.add_input(2);
console.log(comp.run_program());
