app = angular.module('apiServiceModule', []);
app.factory('apiService', ($http, $routeParams) => {
    let url = 'http://localhost:3000';
    return {
        getTasks: () =>{
            return $http.get(`${url}/task`);
        },
        postTask: (task) => {
            return $http.post(`${url}/task`,task);
        },
        putTask: (task) => {
            return $http.put(`${url}/task`,task);
        }
        
    }
})