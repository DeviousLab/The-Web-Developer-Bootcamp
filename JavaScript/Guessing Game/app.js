
let maximum = parseInt(prompt("Enter the maximum number: "));
while (!maximum) {
    maximum = parseInt(prompt("Input a valid number! "));
}

const targetNum = Math.floor(Math.random() * maximum) + 1;

let guess = parseInt(prompt("Enter your prompt: "));
let attempts = 1;

while (parseInt(guess) !== targetNum) {
    if (guess === 'q') break;
    attempts++
    if (guess > targetNum) {
        guess = parseInt(prompt("Too high, guess another number: "));
    }
    else {
        guess = parseInt(prompt("Too low, guess another number: "));
    }
}
if (guess === 'q') {
    console.log('Quit')
}
else {
console.log(`You got in ${attempts}, nice!`)
}
