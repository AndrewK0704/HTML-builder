const path = require('path');
const fs = require('fs')

let way0=path.join(__dirname, 'project-dist');
let way1=path.join(__dirname, 'project-dist/assets');
let way2=path.join(__dirname, 'assets');

let way5=path.join(__dirname, 'styles');
let way7=path.join(__dirname, 'project-dist', 'style.css');

let way8=path.join(__dirname, 'project-dist', 'index.html');
let way9=path.join(__dirname, 'components');
let result1='';
let result2='';
let result3='';

fs.rm(way0, { recursive: true, force: true }, () => {
    fs.mkdir(way1, { recursive: true }, () => {

        fs.readdir(way2, {withFileTypes: true}, (error, data)=>{
            for (const file of data) {
                
                if(file.isFile()) {
                    fs.copyFile(path.join(way2, file.name), path.join(way1, file.name), (error) => {
                    });
                }
                if(file.isDirectory()) {
                    let way3=path.join(__dirname,'project-dist/assets',file.name);
                    let way4=path.join(__dirname,'assets',file.name);
                    fs.mkdir(way3, { recursive: true }, () => {
                        fs.readdir(way4, {withFileTypes: true}, (error, data)=>{
                            for (const file of data) {
                                fs.copyFile(path.join(way4, file.name), path.join(way3, file.name), (error) => {
                                });
                            }
                        })
                    });
                }
            }
        })

        fs.readdir(way5, {withFileTypes: true}, (error, data)=>{
            for (const file of data) {
                if(file.isFile()) {
                    let way6=path.join(__dirname,'styles',file.name);
                    if(path.parse(way6).ext==='.css'){
                        let readStream=fs.createReadStream(way6,'utf8');
                        let writeStream=fs.createWriteStream(way7, {flags: 'a'});
                        readStream.on('data', (chunk)=>{
                            writeStream.write(chunk+'\n'+'\n');
                        })
                    }
                }
            }
        })

        fs.copyFile(path.join(__dirname,'template.html'), path.join(way0, 'index.html'), (error) => {
            let readStream=fs.createReadStream(way8,'utf8');
            readStream.on('data', (chunk1)=>{
                result1=chunk1;
            })

            fs.readdir(way9, {withFileTypes: true}, (error, data)=>{
                result2='';
                for (const file of data) {
                    if(file.isFile()) {
                        let way10=path.join(__dirname,'components',file.name);
                        if(path.parse(way10).ext==='.html'){
                            let readStream2=fs.createReadStream(way10,'utf8');
                            let regex = new RegExp('\\{\\{'+path.parse(way10).name+'\\}\\}','g');
                            readStream2.on('data', (chunk2)=>{
                                result2=chunk2;
                                result3=result1.replace(regex, result2);
                                result1=result3;
                                let writeStream=fs.createWriteStream(way8);
                                writeStream.write('');
                                writeStream.write(result1.replace(regex, result2));
                                writeStream.end();
                            })
                        }
                    }
                }
            })
        });

    });
})