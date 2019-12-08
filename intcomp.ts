
export class intcomp{
    memory: Array<number> = [];
    pointer:number = 0;
    outputs: Array<number> = [];
    input: number = null;
    last_output: number = null;

    constructor(memory: Array<string>){
        memory.forEach(element => this.memory.push(Number(element)));
    }
    add_input(input:number){
        this.input = input;
    }

    split_instruction(instruction: number){
        let str_inst: string = instruction.toString();
        let params: Array<number> = str_inst.slice(0, -2).split('').map(
            element => Number(element)
        );
        while (params.unshift(0) < 3) continue;
        return {command: Number( str_inst.slice(-2) ),
                params: params};
    }

    get_args(params: Array<number>){
        let arg1: number = params[params.length-1] ? this.memory[this.pointer+1] : this.memory[this.memory[ this.pointer+1 ]];
        let arg2: number = params[params.length-2] ? this.memory[this.pointer+2] : this.memory[this.memory[ this.pointer+2 ]];
        
        return {arg1: arg1, arg2: arg2};
    }

    run_program(){
        while (true){
            let {command, params} = this.split_instruction(this.memory[this.pointer]);
            let {arg1, arg2} = this.get_args(params);
            if (command === 1){
                this.memory[this.memory[this.pointer+3]] = arg1 + arg2;
                this.pointer += 4;
            }
            else if (command === 2){
                this.memory[this.memory[this.pointer+3]] = arg1 * arg2;
                this.pointer += 4;
            }
            else if (command === 3){
                if (this.input === null){
                    return
                }
                this.memory[this.memory[this.pointer+1]] = this.input;
                this.pointer += 2;
                this.input = null;
            }
            else if (command === 4){
                let output: number;
                if (params[params.length-1]){
                    output = this.memory[this.pointer+1];
                }
                else{
                    output = this.memory[this.memory[this.pointer+1]];
                }
                this.pointer += 2;
                this.last_output = output;
                return output;
            }
            else if (command === 5){
                if (arg1 !== 0){
                    this.pointer = arg2;
                }
                else {
                    this.pointer += 3;
                }
            }
            else if (command === 6){
                if (arg1 === 0){
                    this.pointer = arg2;
                }
                else {
                    this.pointer += 3;
                }
            }
            else if (command === 7){
                if (arg1 < arg2){
                    this.memory[this.memory[this.pointer+3]] = 1;
                }
                else {
                    this.memory[this.memory[this.pointer+3]] = 0;
                }
                this.pointer +=4;
            }
            else if (command === 8){
                if (arg1 === arg2){
                    this.memory[this.memory[this.pointer+3]] = 1;
                }
                else {
                    this.memory[this.memory[this.pointer+3]] = 0;
                }
                this.pointer +=4;
            }
            else if (command === 99){
                return null;

            }
            else {
                throw new Error(`Error in execution of ${command}`)
            }
        }
    }
}

