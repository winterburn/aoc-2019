import * as fs from 'fs';
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
var planet_count = [0, [0,0]];
reader.on('close', () => {
    for (let asteroid of asteroids){
        let list_of_kks = {};
        let count: number = 0;
        for(let roid of asteroids){
            let kk: number = null;
            let add: boolean = true;
            if (asteroid === roid) continue;
            let x = asteroid[0] - roid[0];
            let y = asteroid[1] - roid[1];
            if (y !== 0){
                kk = x/y;
            }
            if (kk in list_of_kks){
                list_of_kks[kk].some(element => {
                    if(x !== 0){
                        if (element[0] < 0 && x < 0){
                            add = false;
                        }
                        else if (element[0] > 0 && x > 0){
                            add = false;
                        }
                    }
                    else{
                        if(y < 0 && element[1] < 0){
                            add = false;
                        }
                        else if(y > 0 && element[1] > 0){
                            add = false;
                        }
                    }
                })
                if (add){
                    list_of_kks[kk].push([x,y]);
                }
            }
            else {list_of_kks[kk] = [[x,y]]}
        }
        for (let key of Object.keys(list_of_kks)){
            count += list_of_kks[key].length;
        }
        if (count > planet_count[0]){
            planet_count = [count, asteroid];
        }
    }
    console.log(planet_count);
});
