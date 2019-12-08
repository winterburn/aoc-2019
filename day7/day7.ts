import * as fs from 'fs';
var Combinatorics = require('js-combinatorics');
import {intcomp} from '../intcomp';

var input: Array<string> = fs.readFileSync('./day7/day7_input.txt').toString().trim().split(',');

let permutations:Array<Array<string>> = Combinatorics.permutation(['5', '6', '7', '8', '9']);
let thrust:Array<number> = [];

permutations.forEach(array => {
    let amp1 = new intcomp(input);
    let amp2 = new intcomp(input);
    let amp3 = new intcomp(input);
    let amp4 = new intcomp(input);
    let amp5 = new intcomp(input);
    let output5 = '0';
    let started = false;

    while(true){
        if (!started){
            amp1.add_input(array[0]);
            amp1.run_program();
            amp1.add_input('0');}
        else{amp1.add_input(output5)}
        let output1 = amp1.run_program();
        if (!started){
            amp2.add_input(array[1]);
            amp2.run_program();
        }
        amp2.add_input(output1);
        let output2 = amp2.run_program();
        if (!started){
            amp3.add_input(array[2]);
            amp3.run_program();
        }
        amp3.add_input(output2);
        let output3 = amp3.run_program();
        if (!started) {
            amp4.add_input(array[3]);
            amp4.run_program();
        }
        amp4.add_input(output3);
        let output4 = amp4.run_program();
        if (!started){
            amp5.add_input(array[4]);
            amp5.run_program();
            started = true;
        }
        amp5.add_input(output4);
        output5 = amp5.run_program();
        console.log(output5);
        if (output5 === 'Halt' || !output5){
            thrust.push(Number(amp5.last_output));
            break;
        }
    }
})

let sortfn = (n1 , n2) => { { return n1 < n2; }};

thrust.sort((n1,n2) => {
    if (n1 > n2) {
        return 1;
    }

    if (n1 < n2) {
        return -1;
    }

    return 0;
});
console.log(thrust[thrust.length-1]);

