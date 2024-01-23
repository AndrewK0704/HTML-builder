const fs = require('fs');
const path = require('path');
const process = require('process');

let writeStream=fs.createWriteStream(path.join(__dirname, 'text.txt'));

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