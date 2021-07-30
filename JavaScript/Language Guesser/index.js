const franc = require('franc');
const langs = require('langs');
const colors = require('colors');
const input = process.argv[2];

const inputLang = franc(input);

if (inputLang === 'und') {
    console.log('Try with more sample text'.red);
} else {
    const language = langs.where(3,inputLang)
    console.log(`The language used is ${language.name}`.green);
}

