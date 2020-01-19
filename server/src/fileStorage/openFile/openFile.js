const fs = require('fs');
const path = require('path');


function openFile(url, send) {
    fs.readFile(url, function(err,data) {
        if(err) send.send({status:false,message:'данный файл отсутствует или повреден, обновите страницу или попробуйте позднее', messageType:'error'})
        send.end(data)
    })
}

module.exports = openFile