"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rd = require("readline");
var reader = rd.createInterface(fs.createReadStream('input_day1.txt'));
var data = [];
var fuel_required = 0;
reader.on('line', (mass) => {
    fuel_required += Math.floor(Number(mass) / 3) - 2;
    console.log(fuel_required);
});
reader.on('close', () => {
    console.log(`final fuel required: ${fuel_required}`);
});
