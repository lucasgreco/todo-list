var app = angular.module('todoApp', 
    [
        'ngRoute',
        'todoList',
        'todoForm'
    ]);

    // app.config(function($routeProvider){
    //     $routeProvider
    //       .when("/", {
    //         templateUrl : './pages/todoList.html',
    //         controller: "TodoListController",
    //       })
    //       .when("/form", {
    //         templateUrl : './pages/todoForm.html',
    //         controller: "TodoFormController",
    //       })
    //       .otherwise({redirectTo: '/'});
    // }); 
    