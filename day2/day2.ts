import * as fs from 'fs';

var input: Array<string> = fs.readFileSync('./day2/day2_input.txt').toString().split(',');
var m_input: Array<number> = [];
for (let i = 0; i < input.length; i++){
    m_input.push(Number(input[i]));
}
m_input[1] = 12;
m_input[2] = 2;
for (let i = 0; i < m_input.length; i+=4){
    console.log(input[i])
    if (m_input[i] === 1){
        m_input[m_input[i+3]] = m_input[m_input[ i+1 ]] + m_input[m_input[ i+2 ]];
    }
    else if (m_input[i] === 2){
        m_input[m_input[i+3]] = m_input[m_input[ i+1 ]] * m_input[m_input[ i+2 ]];
    }
    else if (m_input[i] === 99){
        console.log(m_input);
    }
}
