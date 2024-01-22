const path = require('path');
const fs = require('fs');

let way=path.join(__dirname, 'styles');
let way3=path.join(__dirname,'project-dist','bundle.css');

fs.readFile(way3, (err, data) => {
    if (err) {
        let writeStream=fs.createWriteStream(way3, {flags: 'a'});

        fs.readdir(way, {withFileTypes: true}, (error, data)=>{
            for (const file of data) {
                if(file.isFile()) {
                    let way2=path.join(__dirname,'styles',file.name);
                    if(path.parse(way2).ext==='.css'){
                        let readStream=fs.createReadStream(way2,'utf8');
                        readStream.on('data', (chunk)=>{
                            writeStream.write(chunk+'\n');
                        })
                    }
                }
            }
        })
    }
    else{
        fs.unlink(way3, (err, data) => {
            let writeStream=fs.createWriteStream(way3, {flags: 'a'});

            fs.readdir(way, {withFileTypes: true}, (error, data)=>{
                for (const file of data) {
                    if(file.isFile()) {
                        let way2=path.join(__dirname,'styles',file.name);
                        if(path.parse(way2).ext==='.css'){
                            let readStream=fs.createReadStream(way2,'utf8');
                            readStream.on('data', (chunk)=>{
                                writeStream.write(chunk+'\n');
                            })
                        }
                    }
                }
            })
        })
    }
})