import * as fs from 'fs';
import {intcomp} from '../intcomp';
const readline = require('readline')
var sleep = require('system-sleep');
var input: Array<string> = fs.readFileSync('./day13/day13_input.txt').toString().trim().split(',');
input[0] = '2';
var translate = {0: '  ', 1: '| ', 2:'# ', 3: '- ', 4:'O '}

let comp = new intcomp(input);
var field: Array<Array<number>> = Array(24)
for (let i = 0; i < field.length; i++){
    field[i] = []
    for (let z = 0; z < 40; z++){
        field[i].push(0)
    }
}
let score = 0;
let stroke = 0;
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if(str === 'c'){throw new Error('Quit')}
})
var ballX = 20;

while(true){
    sleep(10);
    let halt = comp.run_program();
    let result = comp.get_output();

    for (let i = 0; i < result.length; i += 3){
        if(result[i] === -1){score = result[i+2];}
        if(result[i+2] === 4){
            console.log(`${result[i]}`)
            console.log(`${ballX}`)
            if (ballX > result[i]){ballX -= 1; comp.add_input(-1)}
            else if (ballX < result[i]){ballX += 1; comp.add_input(1)}
            else{comp.add_input(0);}
        }
        field[result[i+1]][result[i]] = translate[result[i+2]]
    }
    console.clear()

    for (let row of field){
        console.log(String(row.join('')))
    }
    console.log(score);
    console.log(stroke)
    if(halt === null){break}
}
