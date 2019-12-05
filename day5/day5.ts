import * as fs from 'fs';

var input: Array<string> = fs.readFileSync('./day5/day5_input.txt').toString().split(',');

run_program(input);
function run_program(memory: Array<string>){
    let pointer:number = 0
    while (true){
        let command: number = Number(memory[pointer].toString().slice(-2));
        let params: Array<string> = memory[pointer].toString().slice(0, -2).split('');
        while (params.unshift('0') < 3) continue;
        let arg1: number = Number((params[params.length-1] === '1') ? memory[pointer+1] : memory[memory[ pointer+1 ]]);
        let arg2: number = Number( (params[params.length-2] === '1') ? memory[pointer+2] : memory[memory[ pointer+2 ]] );
        if (command === 1){
            memory[memory[pointer+3]] = String(arg1 + arg2);
            pointer += 4;
        }
        else if (command === 2){
            memory[memory[pointer+3]] = String(arg1 * arg2);
            pointer += 4;
        }
        else if (command === 3){
            memory[memory[pointer+1]] = '5';
            pointer += 2;
        }
        else if (command === 4){
            if (params[params.length-1] === '1'){
                console.log(`output: ${memory[pointer+1]}`)
            }
            else{
                console.log(`output: ${memory[memory[pointer+1]]}`)
            }
            pointer += 2;
        }
        else if (command === 5){
            if (arg1 !== 0){
                pointer = arg2;
            }
            else {
                pointer += 3;
            }
        }
        else if (command === 6){
            if (arg1 === 0){
                pointer = arg2;
            }
            else {
                pointer += 3;
            }
        }
        else if (command === 7){
            if (arg1 < arg2){
                memory[memory[pointer+3]] = 1;
            }
            else {
                memory[memory[pointer+3]] = 0;
            }
            pointer +=4;
        }
        else if (command === 8){
            if (arg1 === arg2){
                memory[memory[pointer+3]] = 1;
            }
            else {
                memory[memory[pointer+3]] = 0;
            }
            pointer +=4;
        }
        else if (command === 99){
            return memory[0];
           
        }
    }
}
