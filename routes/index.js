'use strict';

const routes = (app) => {
    const todo = require('../controllers/Todo')
    //Todo route
    app.route('/todo/:id?/')
    .get(todo.get)
    .post(todo.create)
    .put(todo.update)
    .delete(todo.delete)
}
module.exports = routes;

// routes is a function which accepts express app as an argument so that we can access express methods here