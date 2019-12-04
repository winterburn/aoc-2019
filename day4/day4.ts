var region_start: number = 206938;
var region_end: number = 679128;
var result: Array<any> = []

for (let i = region_start; i < region_end; i++){
    let digits = i.toString().split('');
    let real_digits = digits.map(Number);
    let digit_count: Array<number> = [];
    let doubles = false;
    let bigger = true;
    let count = 0;
    for(let x = 0; x < real_digits.length -1; x++){
        if (real_digits[x] > real_digits[x+1]) bigger = false;
        if (real_digits[x] === real_digits[x+1]) {
            doubles = true;
            count++;
        }
        else{digit_count.push(count); count = 0;}

    }
    if (count > 0) digit_count.push(count);
    let pair = digit_count.find(element => element === 1);
    
    if (doubles && bigger && pair) { console.log(real_digits); result.push(real_digits); }
}

console.log(result);
console.log(result.length);
