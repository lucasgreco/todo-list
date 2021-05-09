angular
    .module('todoForm')
    .component('todoForm', {
        controller: 'TodoFormController',
        templateUrl : '/pages/todo-list/todo-list.template.html',
    })
    .controller('TodoFormController', function($scope, $routeParams, apiService, $location) {
        $scope.didYouMean = '';
        $scope.submit = function() {
            apiService.postTask({description:$scope.description,responsable:$scope.responsable, email:$scope.email, status:"pendente"}).then(
            res => {
                $location.path("/");
            }, 
            err => {
                console.log(err);
            });

        };
    })
    .directive('validEmail', function($http, $q, $timeout) {
        return {
          require: 'ngModel',
          link: function(scope, elm, attrs, ctrl) {
      
            ctrl.$asyncValidators.validEmail = function(modelValue, viewValue) {
                return $http.get(`https://apilayer.net/api/check?access_key=f20f7ae318c34b92ee6a685fac758feb&email=${viewValue}`)
                .then(
                    res => {
                        console.log(res.data);
                        if(!res){
                            return $q.reject()
                        }
                        if(res.data.mx_found && res.data.format_valid){

                            return true;
                        }else{
                            scope.didYouMean = res.data.did_you_mean;
                            return $q.reject();
                        }
                        
                    }
                );
            //   if (ctrl.$isEmpty(modelValue)) {
            //     // consider empty model valid
            //     return $q.resolve();
            //   }
      
            //   var def = $q.defer();
      
            //   $timeout(function() {
            //     // Mock a delayed response
            //     if (usernames.indexOf(modelValue) === -1) {
            //       // The username is available
            //       def.resolve();
            //     } else {
            //       def.reject();
            //     }
      
            //   }, 2000);
      
            //   return def.promise;
            };
          }
        };
    });