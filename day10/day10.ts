import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('day10/day10_test2.txt'));
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
var planet_count = [0, [0,0], {}];
function direction(x, y){
    if (x === 0){
        if (y > 0) return 'positive';
        return 'negative';
    }
    else if(x > 0) return 'positive';
    else if(x < 0) return 'negative';
}
var sort = (n1,n2) => {
    if (n1 > n2) {
        return 1;
    }

    if (n1 < n2) {
        return -1;
    }

    return 0;
}
reader.on('close', () => {
    for (let asteroid of asteroids){
        let list_of_kks = {};
        let count: number = 0;
        for(let roid of asteroids){
            let kk: number = 1000;
            let add: boolean = true;
            if (asteroid === roid) continue;
            let x = asteroid[0] - roid[0];
            let y = asteroid[1] - roid[1];
            let dir = direction(x,y);
            if (x !== 0){
                kk = y/x;
            }
            if (kk in list_of_kks){
                list_of_kks[kk][dir].push([roid[0],roid[1], Math.hypot(x, y)]);
            }
            else {
                list_of_kks[kk] ={'negative': [], 'positive': []}
                list_of_kks[kk][dir] = [[roid[0],roid[1], Math.hypot(x, y)]]}
        }
        for (let key of Object.keys(list_of_kks)){
            list_of_kks[key]['negative'].sort((n1, n2) => sort(n1[2], n2[2]))
            list_of_kks[key]['positive'].sort((n1, n2) => sort(n1[2], n2[2]))
            if (list_of_kks[key]['negative'].length &&
                list_of_kks[key]['positive'].length){
                count += 2
            }
            else if (list_of_kks[key]['negative'].length
                     || list_of_kks[key]['positive'].length){
                count += 1
            }
        }
        if (count > planet_count[0]){
            planet_count = [count, asteroid, list_of_kks];
        }
    }
    console.log(planet_count[0])
    console.log(planet_count[1])
    let negative_kks = Object.keys(planet_count[2]).sort((n1, n2) => sort(Number(n1), Number(n2)));
    let positive_kks = Object.keys(planet_count[2]).sort((n2, n1) => sort(Number(n1), Number(n2)));
    negative_kks.pop()
    let count = 0;
    while(true){
        for (let kk of positive_kks){
            let result = planet_count[2][kk]['positive'].shift();
            if (result){count++}
            if (count === 200){console.log(result); break;}
        }
        let result = planet_count[2][1000]['negative'].shift();
        if (result){count++}
        if (count === 200){console.log(result);break;}
        for (let kk of negative_kks){
            let result = planet_count[2][kk]['negative'].shift();
            if (result){count++}
            if (count === 200){console.log(result); console.log(kk);break;}
        }
    }
});
