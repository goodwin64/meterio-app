'use strict';

angular.module('MeterioApp').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/meters', {
        template: '<meters-list></meters-list>'
    });
}]).component('metersList', {
    templateUrl: 'views/meters-list.html',
    controller: metersListController
});

function metersListController(metersService) {
    var _this = this;

    var metersList = void 0;
    this.metersList = [];
    metersService.getMetersList().then(function (data) {
        metersList = _this.metersList = data;
    });

    Object.assign(this, {
        toggleType: toggleType,
        filterMetersFn: filterMetersFn,
        isActiveType: isActiveType,
        createMeter: createMeter
    });

    var vm = this;

    this.options = {};

    this.options.limitMetersCount = 5;
    this.options.metersParamsTitles = ['date', 'amount', 'type'];

    this.options.sortParam = 'date';
    this.options.sortIsReversed = true;

    this.options.filterParams = {};

    function filterMetersFn(meter) {
        // date
        var date = new Date(meter.date);
        var dateFrom = vm.options.filterParams.dateFrom || -Infinity;
        var dateTo = vm.options.filterParams.dateTo || Infinity;

        // type
        var isTypeCorrect = isActiveType(meter.type.name);

        return isTypeCorrect && date > dateFrom && date < dateTo;
    }

    // types
    this.options.metersTypes = ['hot water', 'cold water', 'electricity'];
    var selectedTypes = new Set(this.options.metersTypes);

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

    function createMeter() {
        var newMeter = {
            index: metersList.length,
            date: new Date(),
            amount: null,
            type: { name: 'electricity' }
        };
        metersList.push(newMeter);
    }
}