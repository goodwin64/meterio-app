angular
  .module('MeterioApp')
  
  .component('loginForm', {
    templateUrl: 'views/login.html',
    controller: loginController
  });


function loginController() {
  this.data = 'login';
}
