angular
    .module('todoList')
    .component('todoList', {
        controller: 'TodoListController',
        templateUrl : '/pages/todo-list/todo-list.template.html',
        // template:template
    })
    .controller('TodoListController', function($scope, $routeParams, apiService) {
      var todoList = this;
      todoList.todos = [];

      apiService.getTasks().then(
        res => {
          todoList.todos = res.data;
        }, 
        err => {
            console.log(err);
        });

      todoList.remaining = function() {
        var count = 0;
        angular.forEach(todoList.todos, function(todo) {
          count += todo.status == 'pendente' ? 0 : 1;
        });
        return count;
      };
  
      todoList.archive = function() {
        var oldTodos = todoList.todos;
        todoList.todos = [];
        angular.forEach(oldTodos, function(todo) {
          if (todo.status != 'pentende') todoList.todos.push(todo);
        });
      };
});