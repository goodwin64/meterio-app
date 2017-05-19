angular

  .module('MeterioApp')
  
  .service('accessService', accessService);

function accessService() {

    const existingUser = {
      id: 123,
      login: 'user',
      password: 'pass'
    };
    
    let myCookie = "i_am_unique";

    const checkAccess = (trans) => {
        const stateTo = trans.to();
        const user = userService.getCurrentUser();

        if (stateTo.data
            && stateTo.data.role
            && !stateTo.data.role.includes(user.role)) {
            $state.go('404');
        }
    };

    return {
        getMainPage,
        checkAccess
    };
}
