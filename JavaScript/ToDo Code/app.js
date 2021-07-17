let message = prompt("What would you like to do?");
const todos = ['Collect Chicken Eggs', 'Buy Groceries', 'Learn JavaScript'];
while(message !== 'quit' && message !== 'q') {
    if (input === 'list') {
        console.log('*************');
        for(let i =0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
        console.log('*************');
    } else if (input === 'add') {
        const newTodo = prompt("What would you like to add?");
        todos.push(newTodo);
        console.log(`${newTodo} added`);
    } else if (input === 'delete') {
        const index = parseInt(prompt("Which todo would you like to delete?"));
        if (Number.isNaN(index)) {
            const deleted = todos.splice(index, 1);
            console.log(`${deleted} has been removed from the list.`)
        } else {
            console.log(`Index ${index} is not a number.`);
        }
    }
    message = prompt("What would you like to do?");
}
console.log('Quit the app...');
