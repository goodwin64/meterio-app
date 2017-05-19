angular
    .module('MeterioApp', [
        'ngRoute'
    ])

    .controller('mainCtrl', function($scope, $location, $routeParams, metersService) {
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $scope.getMeter = metersService.getMeter;
    })

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/main', {
                template: `<h1>main<h1>`
            })
            .when('/stats', {
                template: `stats`
            })
            // .otherwise({
            //     redirectTo: '/main'
            // });
    }])
;

















