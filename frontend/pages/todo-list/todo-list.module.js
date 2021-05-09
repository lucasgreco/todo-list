angular.module('todoList', ['apiServiceModule', 'pathgather.popeye']);

app.controller('ModalCtrl',function ($scope){
    $scope.currentTask = '';
    $scope.password = '';
    $scope.wrongPassword = false;
    $scope.teste = () => {
        if($scope.password == 'TrabalheNaSaipos') {
            $scope.$close({rightPassword:true});
        }else {
            $scope.wrongPassword = true;
        }
    }
 });