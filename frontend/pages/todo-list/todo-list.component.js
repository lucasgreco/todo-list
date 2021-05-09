angular
    .module('todoList')
    .component('todoList', {
        controller: 'TodoListController',
        templateUrl : '/pages/todo-list/todo-list.template.html',
        // template:template
    })
    .controller('TodoListController', function($scope, apiService, $http, Popeye) {
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

      $scope.changeStatusTask = (task, status) => {
        let editedTask = task;
        editedTask.status = status
        apiService.putTask(editedTask).then(
          res => {
            $scope.loadTask();
          }, err => {
            console.log(err);
          }
        )
      }
      
      $scope.askPermission = (task) => {
        //abrir modal para entrar com senha
        var modal = Popeye.openModal({
          templateUrl: "./pages/todo-list/modal.template.html",
          controller: 'ModalCtrl',
        });

        // Update user after modal is closed
        modal.closed.then(function(res) {
          if(res.rightPassword){
            task.reset_status_count = task.reset_status_count+1;
            console.log(task);
             $scope.changeStatusTask(task,'pendente');
          }
        });
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

      // $scope.nextTask = (tasks, index) => {
      //   if(index == 3){
      //     $scope.loadTask();
      //   }else{
      //     apiService.postTask({description:tasks.data[index].text,responsable:'Eu', email:'eu@me.com', status:"pendente"})
      //     .then(
      //       res => {
      //         let j = index+1;
      //         $scope.nextTask(tasks,j)
      //       }, 
      //       err => {
      //           console.log(err);
      //       }
      //     )
      //   }
      // }

      $scope.newTasks = () => {
        $http.get('https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3').then(
          res => {
            res.data.map(task => {
              apiService.postTask({description:task.text,responsable:'Eu', email:'eu@me.com', status:"pendente"})
            })
            // $scope.nextTask(res, 0);
            $scope.loadTask();
          },
          err => {
            console.log(err);
          }
        )
      }
});