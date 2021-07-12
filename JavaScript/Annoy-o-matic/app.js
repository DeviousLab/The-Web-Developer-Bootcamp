/* var answer = prompt("Are we there yet?")


while (answer !== "yes" && answer !== "yeah") {
    var answer = prompt("Are we there yet?");
}

alert("We made it!");
 */

/* if (answer === "yes") {
    alert("We made it!");
} else {
    var answer = prompt("Are we there yet?");
} */

var answer = prompt("Are we there yet?")


while (answer.indexOf("yes") === -1 ) {
    var answer = prompt("Are we there yet?");
}

alert("We made it!");
