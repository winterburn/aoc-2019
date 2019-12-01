"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rd = require("readline");
var reader = rd.createInterface(fs.createReadStream('day1/input_day1.txt'));
var data = [];
var fuel_required = 0;
reader.on('line', (mass) => {
    fuel_required = fuel_required + calculate_fuel(Number(mass));
    console.log(fuel_required);
});
reader.on('close', () => {
    console.log(`final fuel required: ${fuel_required}`);
});
var calculate_fuel = (mass) => {
    let fuel = Math.floor(mass / 3) - 2;
    if (fuel > 0) {
        return fuel + calculate_fuel(fuel);
    }
    return 0;
};
