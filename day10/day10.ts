import * as fs from 'fs';
import { keys } from 'lodash';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('day10/day10_input.txt'));
let row: number = 0;
let asteroids: Array<Array<number>> = []
reader.on('line', (line:string) => {
    let space = line.split('');
    for (let idx in space){
        if(space[idx] === '#'){
            asteroids.push([Number(idx), row])
        }
    }
    row++;
});
reader.on('close', () => {
    let candidate = [0, 0, {}];
    for (let asteroid of asteroids){
        let directions: { [key: number]: Array<Array<number>> } = {};
        for (let asteroid2 of asteroids) {
            let x = asteroid2[0] - asteroid[0];
            let y = asteroid2[1] - asteroid[1];
            if (x === 0 && y === 0) continue;
            let direction = Math.atan2(x, y);
            if (x < 0) direction = direction = direction * -1 + Math.PI;
            if (!(direction in directions)) directions[direction] = [[asteroid2[0], asteroid2[1]]];
            else directions[direction].push([asteroid2[0], asteroid2[1]]);
        }
        if (keys(candidate[2]).length < keys(directions).length){
            candidate = [asteroid[0], asteroid[1], directions];
        }
    }
    console.log(candidate[0], candidate[1], keys(candidate[2]).length);
    let count = 0;
    for (let i = 0; i < keys(candidate[2]).length; i++) {
        for (let key of keys(candidate[2]).sort()){
            let droid = candidate[2][key].pop();
            if (candidate[2][key].length === 0) delete candidate[2][key];
            count++;
            if (count === 200) console.log(`part 2 answer: ${droid[0]*100+droid[1]}`)
        }
    }

});
