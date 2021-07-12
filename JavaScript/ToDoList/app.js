window.setTimeout(function() {
    var todos = [];

    var input = prompt("What would you like to do?");

    while (input !== "quit") {
        if (input === "list") {
            console.log("*******");
            todos.forEach(function(todo, i){
                console.log(i + ": " + todos);
            }); 
            console.log("*******");
        }else if (input === "new") {
            var newToDo = prompt("Enter new todo");
            todos.push(newToDo);
        }else if (input === "delete") {
            var index = prompt("Enter the index of the ToDo to delete:");
            todos.splice(index,1);
        }
        input = prompt("What would you like to do?")
    }
    console.log("You have quit the app")
}, 500);