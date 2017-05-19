angular
    .module('MeterioApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/meters', {
                template: `<meters-list></meters-list>`
            });
    }])

    .component('metersList', {
        templateUrl: 'views/meters-list.html',
        controller: metersListController
    });


function metersListController(metersService) {
    let metersList;
    this.metersList = [];
    metersService.getMetersList().then((data) => {
        metersList = this.metersList = data;
    });

    Object.assign(this, {
        toggleType,
        filterMetersFn,
        isActiveType,
        createMeter
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
        let date = new Date(meter.date);
        let dateFrom = vm.options.filterParams.dateFrom || -Infinity;
        let dateTo = vm.options.filterParams.dateTo || Infinity;

        // type
        let isTypeCorrect = isActiveType(meter.type.name);

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

    function createMeter() {
        let newMeter = {
            index: metersList.length,
            date: new Date(),
            amount: null,
            type: {name: 'electricity'}
        };
        metersList.push(newMeter);
    }
}