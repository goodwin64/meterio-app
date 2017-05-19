'use strict';

angular.module('MeterioApp').directive('dateInput', function () {
    return {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: function link(scope) {
            if (scope.ngModel) scope.ngModel = new Date(scope.ngModel);
        }
    };
});