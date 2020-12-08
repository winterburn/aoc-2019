import * as fs from 'fs';
import { sum, isEqual } from 'lodash';
import { lcm } from 'mathjs';

var input: Array<string> = fs.readFileSync('./day12/input.txt').toString().split('\n');

interface planet {
    position: {x: number, y: number, z:number};
    velocity: {x: number, y: number, z:number};
}

let planets = [];

let re = new RegExp(/(-?\d{1,})/g);

for (let line of input) {
    if (line === '') continue;
    let vals = line.match(re);
    planets.push(<planet>{position: {x: Number(vals[0]), y: Number(vals[1]), z: Number(vals[2])},
                          velocity: {x:0, y:0, z:0}})
}

let compare = (x:number, y:number) => {
    if (x < y) return 1;
    else if (x > y) return -1;
    return 0;
}

let system_energy = () => {
    let total_energy = 0;
    planets.forEach(planet =>{
        total_energy +=(sum([Math.abs(planet.position.x), Math.abs(planet.position.y), Math.abs(planet.position.z)]) *
                        sum([Math.abs(planet.velocity.x), Math.abs(planet.velocity.y), Math.abs(planet.velocity.z)]));
    })
    return total_energy;
}

let get_state = (axis:string) => {
    let state = [];
    planets.forEach(planet => {
        state.push([planet.position[axis], planet.velocity[axis]]);
    })
    return state;
} 

let count = 0;
let x_around = 0;
let x_start = get_state('x');
let y_around = 0;
let y_start = get_state('y');
let z_around = 0;
let z_start = get_state('z');
while(true) {
    planets.forEach(planet => {
        planets.filter(val => val !== planet).forEach(planet2 => {
            planet.velocity.x += compare(planet.position.x, planet2.position.x);
            planet.velocity.y += compare(planet.position.y, planet2.position.y);
            planet.velocity.z += compare(planet.position.z, planet2.position.z);
        })
    })
    planets.forEach(planet => {
        planet.position.x += planet.velocity.x;
        planet.position.y += planet.velocity.y;
        planet.position.z += planet.velocity.z;
    })
    count++;
    if (x_around === 0) {
        if (isEqual(x_start, get_state('x'))) x_around = count;
    }
    if (y_around === 0) {
        if (isEqual(y_start, get_state('y'))) y_around = count;
    }
    if (z_around === 0) {
        if (isEqual(z_start, get_state('z'))) z_around = count;
    }
    if (count === 1000) console.log(`Part1: ${system_energy()}`);
    if(x_around !== 0 && y_around !== 0 && z_around !== 0) break;
}
console.log(`Part2: ${lcm(lcm(x_around, y_around), z_around)}`);