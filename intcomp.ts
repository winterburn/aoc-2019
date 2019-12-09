
export class intcomp{
    memory: Array<number> = [];
    pointer:number = 0;
    relative_base: number = 0;
    outputs: Array<number> = [];
    input: number = null;
    last_output: number = null;

    constructor(memory: Array<string>){
        memory.forEach(element => this.memory.push(Number(element)));
        for(let i = 0; i < 2000000;i++){
            this.memory.push(0);
        }
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
        let arg1:number = null;
        let arg2: number = null;
        let arg3: number = null;
        switch(params[params.length-1]){
            case 0:
                arg1 = this.memory[ this.pointer+1 ];
                break;
            case 1:
                arg1 = this.pointer+1;
                break;
            case 2:
                arg1 = this.relative_base + this.memory[this.pointer+1 ];
                break;
        }
        switch(params[params.length-2]){
            case 0:
                arg2 = this.memory[ this.pointer+2 ];
                break;
            case 1:
                arg2 = this.pointer+2;
                break;
            case 2:
                arg2 = this.relative_base + this.memory[this.pointer+2];
                break;
        }
        switch(params[params.length-3]){
            case 0:
                arg3 = this.memory[ this.pointer+3 ];
                break;
            case 1:
                arg3 = this.pointer+3;
                break;
            case 2:
                arg3 = this.relative_base + this.memory[this.pointer+3 ];
                break;
        }
        return {arg1: arg1, arg2: arg2, arg3: arg3};
    }

    run_program(){
        console.log(this.memory)
        while (true){
            let {command, params} = this.split_instruction(this.memory[this.pointer]);
            let {arg1, arg2, arg3} = this.get_args(params);
            if (command === 1){
                this.memory[arg3] = this.memory[arg1] + this.memory[ arg2 ];
                this.pointer += 4;
            }
            else if (command === 2){
                this.memory[arg3] = this.memory[arg1] * this.memory[arg2] ;
                this.pointer += 4;
            }
            else if (command === 3){
                if (this.input === null){
                    return
                }
                this.memory[arg1] = this.input;
                this.pointer += 2;
                this.input = null;
            }
            else if (command === 4){
                this.last_output = this.memory[arg1];
                console.log(this.last_output)
                this.pointer += 2;
            }
            else if (command === 5){
                if (this.memory[arg1] !== 0){
                    this.pointer = this.memory[arg2];
                }
                else {
                    this.pointer += 3;
                }
            }
            else if (command === 6){
                if (this.memory[arg1] === 0){
                    this.pointer = this.memory[arg2];
                }
                else {
                    this.pointer += 3;
                }
            }
            else if (command === 7){
                if (this.memory[arg1] < this.memory[arg2]){
                    this.memory[arg3] = 1;
                }
                else {
                    this.memory[arg3] = 0;
                }
                this.pointer +=4;
            }
            else if (command === 8){
                if (this.memory[arg1] === this.memory[arg2]){
                    this.memory[arg3] = 1;
                }
                else {
                    this.memory[arg3] = 0;
                }
                this.pointer +=4;
            }
            else if (command === 9){
                this.relative_base += this.memory[arg1];
                this.pointer += 2;
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

