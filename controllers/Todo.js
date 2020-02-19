const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./db');

module.exports = {
    get(request, response){
        if(localStorage.getItem('todos')){
            if(!request.params.id){
                response.json({
                    todos: JSON.parse(localStorage.getItem('todos'))
                })
            }else{
                const todos =  JSON.parse(localStorage.getItem('todos')).
                filter((todo) => todo.id === parseInt(request.params.id, 10))
                response.json({
                    todos
                });
            }
        }else{
            //No todos set in localstorage fallback and back empty object
            response.json({
                todos: []
            });
        }
    },
    create(request, response){
        console.log(request.body)
        if(request.body.name && request.body.completed){
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push({
                id: todos.length,
                name: request.body.name,
                completed: request.body.completed === 'true'
            })
            localStorage.setItem('todos', JSON.stringify(todos));
            response.json({message: "Todo has been successfully created"})
        }else{
            response.json({error: "tou must provide name and completed flag for todo"})
        }
    },
    update(request, response){
        console.log(request.params.id)
        let id = parseInt(request.params.id, 10)
        if(id >= 0 && request.body.name && request.body.completed){
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            if(todos.length > 0){
                todos.forEach((value => {
                    if(value.id == id){
                        value.name = (request.body.name) ? request.body.name : value.name;
                        value.completed = (request.body.completed) ? request.body.completed : value.completed;
                    }
                }));
                localStorage.setItem('todos', JSON.stringify(todos));
                response.json({message: "Todo has been successfully Updated"})
            }
        }else{
            response.json({error: "please provide vaild details for update"})
        }
    },
    delete(request, response){
        let id = parseInt(request.params.id, 10)
        if(id >= 0){
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            if(todos.length > 0){
                const NewTodoList = JSON.parse(localStorage.getItem('todos')).filter((value) =>  value.id !== id );
                localStorage.setItem('todos', JSON.stringify(NewTodoList));
                response.json({message: "Todo has been successfully Deleted"});
            }else{
                response.json({error: "Todo list is already empty"})
            }
        }else{
            response.json({error: "please provide vaild id for Delete"})
        }
    },
};