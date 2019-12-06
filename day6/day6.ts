
import * as fs from 'fs';
import * as rd from 'readline';
var reader = rd.createInterface(fs.createReadStream('day6/day6_input.txt'));
interface Planet {
    previous: string;
}
var planets: object = {};
reader.on('line', (orbit:string) => {
    let stripped = orbit.split(')');
    planets[stripped[1]] = stripped[0];
})
reader.on('close', () => {
    let total = 0;
    var track_you: Array<string> = [];
    var track_san: Array<string> = [];
    Object.keys(planets).forEach( key => {
        if ( key === 'YOU'){
            total += follow(key, track_you);
        }
        else if (key === 'SAN'){
            total += follow(key, track_san);
        }
        else{
            total += follow(key, []);
        }
    })
    console.log(total);
    track_you.forEach(( key, you_index ) => {
        let index = track_san.findIndex((element) => element === key);
        if (index >= 0){
            console.log(index + you_index - 2)
        }
    })
})

function follow(next: string, track: Array<string>){
    track.push(next);
    if (next === 'COM'){
        return 0;
    }
    return follow(planets[next], track) + 1;
}
