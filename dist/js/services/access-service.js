'use strict';

angular.module('MeterioApp').service('accessService', accessService);

function accessService() {

    var existingUser = {
        id: 123,
        login: 'user',
        password: 'pass'
    };

    var myCookie = "i_am_unique";

    var checkAccess = function checkAccess(trans) {
        var stateTo = trans.to();
        var user = userService.getCurrentUser();

        if (stateTo.data && stateTo.data.role && !stateTo.data.role.includes(user.role)) {
            $state.go('404');
        }
    };

    return {
        getMainPage: getMainPage,
        checkAccess: checkAccess
    };
}