const fs = require('fs');
const path = require('path');
const process = require('process');

let way=path.join(__dirname, 'text.txt');
let writeStream=fs.createWriteStream(way);

process.stdout.write('Have a nice day! Please, enter the text...\n');

process.stdin.on('data', (data)=>{
    if(data.toString().trim()==='exit'){
        console.log('\nNice to meet you. Good luck!');
        process.exit();
    }
    writeStream.write(data);
})

process.on('SIGINT', () => {
    console.log('\nNice to meet you. Good luck!');
    process.exit();
});