const fs = require('fs');
const path = require('path');


function openFile(url, send) {
    console.log(url)
    send.send('открываю файл')
}

module.exports = openFile;