var app = angular.module('todoApp', 
    [
        'ngRoute',
        'apiServiceModule',
        'todoList',
        'todoForm'
    ]);
    
app.controller('MainController', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
        templateUrl : '/pages/todo-list/todo-list.template.html',
        controller: "TodoListController",
        })
        .when("/form", {
        templateUrl : '/pages/todo-form/todo-form.template.html',
        controller: "TodoFormController",
        })
        .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
}); 
    