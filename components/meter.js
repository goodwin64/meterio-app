angular
  .module('MeterioApp')
  
  .component('meterElement', {
    templateUrl: 'views/meter-element.html',
    controller: meterController,
    bindings: {
      meter: '<?'
    }
  });
  
  
function meterController($scope, $routeParams, metersService) {
  $scope.getLogoUrl = metersService.getLogoUrl;
  this.editable = false;
  
  this.edit = () => {
    this.editable = true;
  };
  
  this.save = () => {
    this.editable = false;
  };

  if ($routeParams.meterId) {
    this.meter = metersService.getMeter($routeParams.meterId);
    this.viewType = 'extended'; // standalone
  } else {
    this.viewType = 'short';    // in the list
  }
}