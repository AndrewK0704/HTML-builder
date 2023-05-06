const fs = require('fs');
const path = require('path');

let way=path.join(__dirname, 'text.txt');
let readStream=fs.createReadStream(way,'utf8');

readStream.on('data', (chunk)=>{
    console.log(chunk);
})