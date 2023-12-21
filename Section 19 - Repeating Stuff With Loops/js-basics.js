// TODO List 
// "new" - Add a Todo 
// "list" - List all Todos 
// "delete" - Remove specific Todo 
// "quit" - Quit app

let todos = [];
let input = prompt("What would you like to do?");

while (input != "quit") {
    if (input === "new") {
        const newTodo = prompt("Enter your todo");
        todos.push(newTodo);
        console.log(`${newTodo} added to list`);
    } else if (input === "list") {
        console.log("********")
        for (let todo of todos) {
            console.log(todos.indexOf(todo) + ": " + todo);
        }
        console.log("********");
    } else if (input === "delete") {
        const numToDelete = parseInt(prompt("Enter index you want to delete:"));
        if (!Number.isNaN(numToDelete)) {
            let deleted = todos.splice(numToDelete, 1);
            console.log(deleted[0] + " is deleted");
        }
    } else {
    alert("Unknown action");
}
input = prompt("What would you like to do?");
}