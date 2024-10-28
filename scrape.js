const { JSDOM } = require('jsdom'); 

async function scrapePage(baseURL, tag) {

    const httpResponse = await fetch(baseURL); 
    if (httpResponse > 399) {
        console.log(`Error in fetching ${baseURL}`);
        return;
    } 

    const contentType = httpResponse.headers.get('content-type');
    if (!contentType.includes('text/html')) {
        console.log(`Non HTML response, content type ${contentType}, on page ${baseURL}`);
        return;
    }

    const htmlBody = await httpResponse.text();
    const scraped = scrapeFromTags(htmlBody, tag);

    return scraped; 
} 

function scrapeFromTags(htmlBody, tag) {
    const content = [];
    const dom = new JSDOM(htmlBody);
    const elements = dom.window.document.querySelectorAll(tag);

    if (tag == 'meta') {
        elements.forEach(tag => {
            if (tag.getAttribute('name')) {
                content.push(`Name: ${tag.getAttribute('name')}, Content: ${tag.getAttribute('content')}`);
            } else if (tag.getAttribute('property')) {
                content.push(`Property: ${tag.getAttribute('property')}, Content: ${tag.getAttribute('content')}`);
            } else if (tag.getAttribute('http-equiv')) {
                content.push(`Property: ${tag.getAttribute('http-equiv')}, Content: ${tag.getAttribute('content')}`);
            } else {
                content.push(`NO NAME OR PROPERTY, Content: ${tag.getAttribute('content')}`);
            }
        });

        return content;

    }

    if (tag == 'a') {
        elements.forEach(tag => {
            content.push(tag.href);
        });
        return content;
    }

    for (const element of elements) {
        content.push(element.innerHTML);
    }

    return content;
}

module.exports = {
    scrapePage,
    scrapeFromTags
};