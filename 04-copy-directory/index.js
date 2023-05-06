const path = require('path');
const fs = require('fs')

let way=path.join(__dirname, 'files');
let way2=path.join(__dirname, 'files-copy');
let flag=0;

fs.readdir(way2, {withFileTypes: true}, (error, data)=>{
    if (error) {
        fs.mkdir(way2, { recursive: true }, (error) => {
        });
        flag=1;
    } else {
        for (const file of data) {
            fs.unlink(path.join(way2, file.name), (error) => {
            });
        }
        flag=1;
    }
    if (flag===1){
        fs.readdir(way, {withFileTypes: true}, (error, data)=>{
            for (const file of data) {
                fs.copyFile(path.join(way, file.name), path.join(way2, file.name), (error) => {
                });
            }
            console.log("Finish!");
        })
    }
})