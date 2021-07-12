
var negativeNumbers = -10;

while (negativeNumbers < 20) {
    console.log (negativeNumbers);
    negativeNumbers++;
}
console.log("=2=")
var evenNumbers = 10;

while (evenNumbers <= 40) {
    if(evenNumbers % 2 === 0) {
        console.log(evenNumbers);
    }
    evenNumbers+=1;
}

console.log("=3=")
var threeNumbers = 300;

while (threeNumbers <= 333) {
    if(threeNumbers % 2 !== 0) {
        console.log(threeNumbers);
    }
    threeNumbers+=1;
}
console.log("=4=")
var divisNumbers = 5;

while (divisNumbers <= 50) {
    if(divisNumbers % 3 === 0 && divisNumbers % 5 ===0) {
        console.log(divisNumbers);
    }
    divisNumbers+=1;
}