angular
    .module('todoList')
    .component('todoList', {
        controller: 'TodoListController',
        templateUrl : '/pages/todo-list/todo-list.template.html',
        // template:template
    })
    .controller('TodoListController', function($scope, apiService, $http) {
      $scope.todos = [];

      $scope.exibPendent = true;

      $scope.loadTask = () => {
        apiService.getTasks().then(
          res => {
            $scope.todos = res.data;
          }, 
          err => {
              console.log(err);
          });
      }

      $scope.loadTask();
      $scope.checkPendent = (todo) => {
        if((todo.status == 'pendente') == $scope.exibPendent){
          return true
        }else {
          return false
        }
      }

      

      $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
          count += todo.status != 'pendente' ? 0 : 1;
        });
        return count;
      };
  
      $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
          if (todo.status != 'pendente') $scope.todos.push(todo);
        });
      };

      $scope.nextTask = (tasks, index) => {
        if(index == 3){
          $scope.loadTask();
        }else{
          apiService.postTask({description:tasks.data[index].text,responsable:'Eu', email:'eu@me.com', status:"pendente"})
          .then(
            res => {
              let j = index+1;
              $scope.nextTask(tasks,j)
            }, 
            err => {
                console.log(err);
            }
          )
        }
      }

      $scope.newTasks = () => {
        $http.get('https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3').then(
          res => {
            $scope.nextTask(res, 0);
            $scope.loadTask();
          },
          err => {
            console.log(err);
          }
        )
      }
});