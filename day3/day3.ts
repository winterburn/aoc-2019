import * as fs from 'fs';
import * as rd from 'readline';
var reader = rd.createInterface(fs.createReadStream('day3/day3_input.txt'));

let grid:number [][] = new Array(10000).fill(0).map(() => new Array(10000).fill(0));


reader.on('line', (line:string) => {
    draw_line(line)
});
reader.on('close', () => {
})
let x_pointer: number = 5000;
let y_pointer: number = 5000;
var draw_line = (line:string) => {
    let input: Array<string> = line.split(',');
    for (let i = 0; i < input.length; i++){
        console.log(grid[2500][2500]);
        if (input[i][0] === 'U'){
            for (let j: number = 0; j < Number( input[i].substring(1) ); j++){
                console.log(y_pointer)
                grid[x_pointer][y_pointer] += 1;
                y_pointer++;
            }
        }
        if (input[i][0] === 'D'){
            for (let j = 0; j < Number( input[i].substring(1) ); j++){
                grid[x_pointer][y_pointer] +=1;
                y_pointer--;
            }
        }
        if (input[i][0] === 'L'){
            for (let j = 0; j < Number( input[i].substring(1) ); j++){
                grid[x_pointer][y_pointer] += 1;
                x_pointer--;
            }
        }
        if (input[i][0] === 'R'){
            for (let j = 0; j < Number( input[i].substring(1) ); j++){
                grid[x_pointer][y_pointer] += 1;
                x_pointer++;
            }
        }
    }
};
