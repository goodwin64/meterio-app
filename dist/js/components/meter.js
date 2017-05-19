'use strict';

angular.module('MeterioApp').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/meters/:meterId', {
        template: '<meter-element></meter-element>'
    });
}]).component('meterElement', {
    templateUrl: 'views/meter-element.html',
    controller: meterController,
    bindings: {
        meter: '<?'
    }
});

function meterController($routeParams, metersService) {
    var _this = this;

    this.$onInit = function () {
        var meter = _this.meter;
        meter.date = new Date(meter.date);
        meter.csstype = meter.type.name.replace(/ /g, '-');
    };

    this.editable = false;

    this.edit = function () {
        _this.editable = true;
    };

    this.save = function () {
        _this.editable = false;
    };

    if ($routeParams.meterId) {
        this.meter = metersService.getMeter($routeParams.meterId);
        this.viewType = 'extended';
    } else {
        this.viewType = 'short';
    }
}