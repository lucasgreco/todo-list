angular
    .module('todoForm')
    .component('todoForm', {
        controller: 'TodoFormController',
        templateUrl : '/pages/todo-list/todo-list.template.html',
    })
    .controller('TodoFormController', function($scope, $routeParams, apiService) {
        var todoForm = this;

    todoForm.test = 'teste'
      todoForm.addTodo = function() {
        apiService.postTask({description:todoForm.todoText,responsable:"site", email:"testereq", status:"pendente"}).then(
          res => {
            todoForm.todoText = '';
          }, 
          err => {
            console.log(err);
          });

      };
    });