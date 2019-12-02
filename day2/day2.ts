import * as fs from 'fs';

var input: Array<string> = fs.readFileSync('./day2/day2_input.txt').toString().split(',');
var m_input: Array<number> = [];
for (let i = 0; i < input.length; i++){
    m_input.push(Number(input[i]));
}

for (let noun = 0; noun < 99; noun++){
    for (let verb = 0; verb < 99; verb++){
        let result = run_program(noun, verb, Object.assign([], m_input));
        if (result === 19690720){
            console.log(`noun: ${noun}, verb: ${verb}`);
        }
    }
}
function run_program(noun: number, verb: number, memory: Array<number>){
    memory[1] = noun;
    memory[2] = verb;
    for (let i = 0; i < memory.length; i+=4){
        if (memory[i] === 1){
            memory[memory[i+3]] = memory[memory[ i+1 ]] + memory[memory[ i+2 ]];
        }
        else if (memory[i] === 2){
            memory[memory[i+3]] = memory[memory[ i+1 ]] * memory[memory[ i+2 ]];
        }
        else if (memory[i] === 99){
            return memory[0];
        }
    }
}
