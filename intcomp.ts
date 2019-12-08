
export class intcomp{
    memory: Array<string> = [];
    pointer:number = 0;
    outputs: Array<string> = [];
    input: string = null;
    last_output: string = null;

    constructor(memory: Array<string>){
        this.memory = memory;
    }
    add_input(input:string){
        this.input = input;
    }

    run_program(){
        while (true){
            let command: number = Number(this.memory[this.pointer].toString().slice(-2));
            let params: Array<string> = this.memory[this.pointer].toString().slice(0, -2).split('');
            while (params.unshift('0') < 3) continue;
            let arg1: number = Number((params[params.length-1] === '1') ? this.memory[this.pointer+1] : this.memory[this.memory[ this.pointer+1 ]]);
            let arg2: number = Number( (params[params.length-2] === '1') ? this.memory[this.pointer+2] : this.memory[this.memory[ this.pointer+2 ]] );
            if (command === 1){
                this.memory[this.memory[this.pointer+3]] = String(arg1 + arg2);
                this.pointer += 4;
            }
            else if (command === 2){
                this.memory[this.memory[this.pointer+3]] = String(arg1 * arg2);
                this.pointer += 4;
            }
            else if (command === 3){
                if ( !this.input){
                    return
                }
                this.memory[this.memory[this.pointer+1]] = this.input;
                this.pointer += 2;
                this.input = null;
            }
            else if (command === 4){
                let output = '';
                if (params[params.length-1] === '1'){
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

