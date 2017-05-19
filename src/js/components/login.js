angular
    .module('MeterioApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                template: `<h1>login<h1>`
            });
    }])

    .component('loginForm', {
        templateUrl: 'views/login.html',
        controller: loginController
    });


function loginController() {
    this.data = 'login';
}
