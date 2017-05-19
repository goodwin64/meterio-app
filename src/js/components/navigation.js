angular
    .module('MeterioApp')

    .component('navigation', {
        templateUrl: 'views/navigation.html',
        controller: navController
    });


function navController($scope) {
    $scope.isMenuShown = false;
    $scope.toggleMenuVisibility = function () {
        $scope.isMenuShown = !$scope.isMenuShown;
    };
}