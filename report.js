const fs = require('fs');

async function writeReport(title, data) {
    const file = `./reports/${title}.txt`;
    fs.writeFile(file, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Report written successfully! \nDone.')
        }
    });
}

module.exports = {
    writeReport
};