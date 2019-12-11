import * as fs from 'fs';
import {intcomp} from '../intcomp';

var input: Array<string> = fs.readFileSync('./day11/day11_input.txt').toString().trim().split(',');

var path: Array<Array<number>> = [];
let comp = new intcomp(input);
let x = 0;
let y = 0;
let dir = 'up';
let color = 1;
while (true){
    path.some((element, idx) => {
        if(element[0] === x && element[1] === y){
            color = path.splice(idx, 1)[0][2];
            console.log(color)
        }
    });
    comp.add_input(color);
    let halt = comp.run_program();
    let result = comp.get_output();
    color = 0;
    if (halt === null) break;
    path.push([x,y,result[0]])
    if (dir ==='up'){
        if (result[1] === 1){
            dir = 'right';
            x++;
        }
        else if (result[1] === 0){
            dir = 'left';
            x--;
        }

    }
    else if (dir ==='down'){
        if (result[1] === 1){
            dir = 'left';
            x--;
        }
        else if (result[1] === 0){
            dir = 'right';
            x++;
        }

    }
    else if (dir ==='left'){
        if (result[1] === 1){
            dir = 'up';
            y++;
        }
        else if (result[1] === 0){
            dir = 'down';
            y--;
        }

    }
    else if (dir ==='right'){
        if (result[1] === 1){
            dir = 'down';
            y--;
        }
        else if (result[1] === 0){
            dir = 'up';
            y++;
        }

    }
}

console.log('done')
let message =[]
for (let i = 5; i > -10; i--){
    let row = [];
    for(let j = 0; j < 50; j++){
        let color = '.';
        path.forEach(element => {
            if (element[0] === j && element[1] === i){
                if (element[2] === 1) {color = '#';}
                else {color = '.'}
            }
        });
        row.push(color);
    }
    message.push(row)

}
message.forEach(element => {console.log(String(element))})



