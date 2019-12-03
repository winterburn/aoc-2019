import * as fs from 'fs';
import * as rd from 'readline';
import * as _ from "lodash";
var reader = rd.createInterface(fs.createReadStream('day3/day3_input.txt'));

let grid:number [][] = new Array(10000).fill(0).map(() => new Array(10000).fill(0));


reader.on('line', (line:string) => {
    calculate_line(line)
});
reader.on('close', () => {
    for(let i = 0; i < lines[0].length; i++){
        let intersection = lines[1].find(element => _.isEqual(element.slice(0, 2), lines[0][i].slice(0, 2)));
        if (intersection){
            console.log(`intersection ${intersection}`);
            console.log(`step count ${intersection[2]+lines[0][i][2]}`);
        }
    }
})
let x_pointer: number = 0;
let y_pointer: number = 0;
let line_count: number = 0;
let lines: Array<Array<Array<number>>> = []
var calculate_line = (line:string) => {
    let input: Array<string> = line.split(',');
    let step_count = 0;
    lines.push([]);
    for (let i = 0; i < input.length; i++){
        if (input[i][0] === 'U'){
            for (let j: number = 0; j < Number( input[i].substring(1) ); j++){
                lines[line_count].push([x_pointer, y_pointer, step_count]);
                y_pointer++;
                step_count++;
            }
        }
        if (input[i][0] === 'D'){
            for (let j = 0; j < Number( input[i].substring(1) ); j++){
                lines[line_count].push([x_pointer, y_pointer, step_count]);
                y_pointer--;
                step_count++;
            }
        }
        if (input[i][0] === 'L'){
            for (let j = 0; j < Number( input[i].substring(1) ); j++){
                lines[line_count].push([x_pointer, y_pointer, step_count]);
                x_pointer--;
                step_count++;
            }
        }
        if (input[i][0] === 'R'){
            for (let j = 0; j < Number( input[i].substring(1) ); j++){
                lines[line_count].push([x_pointer, y_pointer, step_count]);
                x_pointer++;
                step_count++;
            }
        }
        }
    line_count++;
    x_pointer = 0;
    y_pointer = 0;
};
