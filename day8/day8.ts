import * as fs from 'fs';

var input: Array<string> = fs.readFileSync('./day8/day8_input.txt').toString().trim().split('');
var image: Array<Array<Array<number>>> = new Array();
input.forEach((element, idx) => {
    if (image[Math.floor(( idx/25 ) / 6)] === undefined){image[Math.floor((idx / 25) / 6)] = []}
    if (image[Math.floor(( idx/25 ) / 6)][Math.floor(( idx/25 ) % 6)] === undefined){image[Math.floor((idx / 25) / 6)][Math.floor(( idx/25 ) % 6)] = []}
    image[Math.floor((idx / 25) / 6)][Math.floor(( idx/25 ) % 6)].push(Number(element));
});
function solve(layer: Array<Array<number>>){
    let counts: Array<number> = new Array(3).fill(0);
    for (let row of layer) {
        for(let num of row) {
            counts[num]++;
        }
    }
    return counts;
}

let result: Array<number> = [100, 0 , 0];
image.forEach(layer => {
    let solved = solve(layer);
    if (solved[0] < result[0]){
        result = solved;
    }
})

console.log(result[1] * result[2]);
