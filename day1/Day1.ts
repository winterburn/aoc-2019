import * as fs from 'fs';
import * as rd from 'readline';
var reader = rd.createInterface(fs.createReadStream('day1/input_day1.txt'));
var data: Array<string> = [];
var fuel_required: number = 0;
reader.on('line', (mass:string) => {
    fuel_required = fuel_required + calculate_fuel(Number(mass));
    console.log(fuel_required);
});
reader.on('close', () => {
    console.log(`final fuel required: ${fuel_required}`)
})

var calculate_fuel = (mass: number): number => {
    let fuel = Math.floor(mass / 3) - 2;
    if (fuel > 0) {
        return fuel + calculate_fuel(fuel);
    }
    return 0;
};