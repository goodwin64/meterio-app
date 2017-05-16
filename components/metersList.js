angular
  .module('MeterioApp')
  
  .component('metersList', {
    templateUrl: 'views/meters-list.html',
    controller: metersListController
  });
  
  
function metersListController($scope, metersService) {
  $scope.dataFromServer = metersService.getMetersList();
  
  Object.assign(this, {
    toggleType,
    filterMetersFn,
    isActiveType
  });
  
  let vm = this;
  
  this.options = {};
  
  this.options.limitMetersCount = 5;
  this.options.metersParamsTitles = ['date', 'amount', 'type'];
  
  this.options.sortParam = 'date';
  this.options.sortIsReversed = true;
  
  this.options.filterParams = {};
  
  function filterMetersFn(meter) {
    // date
    let date = meter.date;
    let dateFrom = vm.options.filterParams.dateFrom || -Infinity;
    let dateTo = vm.options.filterParams.dateTo || Infinity;
    
    // type
    let isTypeCorrect = isActiveType(meter.type);
    
    return isTypeCorrect 
        && date > dateFrom
        && date < dateTo;
  }
  
  // types
  this.options.metersTypes = ['hot water', 'cold water', 'electricity'];
  let selectedTypes = new Set(this.options.metersTypes);
  
  function toggleType(type) {
    if (selectedTypes.has(type)) {
      selectedTypes.delete(type);
    } else {
      selectedTypes.add(type);
    }
  }
  
  function isActiveType(type) {
    return selectedTypes.has(type);
  }
}