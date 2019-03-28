const fs = require('fs');

function readCSV(filePath, seg = ',') {
    if (typeof filePath !== 'string' || typeof seg !== 'string') {
        throw new Error('Type Error');
    }
    let fileContent = fs.readFileSync(filePath);
    let content = fileContent.toString().split('\r\n');
    content = content.length < 2 ? content.split('\n') : content;
    content = content.map((item => {
        return item.split(seg);
    }))
    return content
}

function writeCSV(data, filePath, seg = ',', newline = 'CRLF') {
    if (typeof filePath !== 'string' || typeof seg !== 'string') {
        throw new Error('Type Error');
    }
    let result = [];
    let dataString = '';
    data.forEach((item) => {
        result.push(item.join(seg));
    })
    dataString = newline.toLowerCase() === 'crlf' ? result.join('\r\n') : result.join('\n');
    dataString = '\ufeff' + dataString;
    fs.writeFile(filePath, dataString, err => {
        if (err) throw new Error(err);
    })
}

module.exports = {
    readCSV,
    writeCSV
};