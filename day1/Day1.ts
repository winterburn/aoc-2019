import * as fs from 'fs';
import * as rd from 'readline';
var reader = rd.createInterface(fs.createReadStream('input_day1.txt'));
var data: Array<string> = [];
var fuel_required = 0;
reader.on('line', (mass:string) => {
    fuel_required += Math.floor(Number(mass) / 3) - 2;
    console.log(fuel_required);
});
reader.on('close', () => {
    console.log(`final fuel required: ${fuel_required}`)
})
