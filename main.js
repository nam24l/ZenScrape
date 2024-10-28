/*
Quick Guide:

1. Open Console 
2. Type "npm run start https://example.com HTMLtag report-title" 

*/

// Import Modules 

const scrape = require('./scrape.js');

const report = require('./report.js');

// Main function 

async function main() {
    // ensure that the arguments are in correct order and in correct number 

    if (process.argv.length < 3) {
        console.error("No valid URL, tag or title provided.");
        process.exit(1);
    } else if (process.argv.length < 4) {
        console.error("No valid tag or title provided.");
        process.exit(1);
    } else if (process.argv.length < 5) {
        console.error("No valid title provided.");
        process.exit(1);
    } else if (process.argv.length > 5) {
        console.error("Too many arguments provided.");
        process.exit(1);
    }

    // separate elements 

    const baseURL = process.argv[2];
    const tag = process.argv[3];
    const title = process.argv[4];

    console.log(`Starting scrape of: ${baseURL}`);

    const result = await scrape.scrapePage(baseURL, tag);
    let data = "";

    for (let i = 0; i < result.length; i++) {
        data += result[i];
    } 

    await report.writeReport(title, data);
} 

main();