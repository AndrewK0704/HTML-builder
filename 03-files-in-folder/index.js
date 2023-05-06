const path = require('path');
const fs = require('fs')

let way=path.join(__dirname, 'secret-folder');

fs.readdir(way, {withFileTypes: true}, (error, data)=>{
    for (const file of data) {
        if(file.isFile()) {
                let way2=path.join(__dirname,'secret-folder',file.name);
                fs.stat(way2, (error, stats) => {
                    const sizeFile = stats.size + "b";
                    console.log(path.parse(way2).name+'   '+path.parse(way2).ext+'   '+sizeFile);
                });
        }
    }
})