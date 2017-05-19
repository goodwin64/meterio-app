angular
    .module('MeterioApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/meters/:meterId', {
                template: `<meter-element></meter-element>`
            });
    }])

    .component('meterElement', {
        templateUrl: 'views/meter-element.html',
        controller: meterController,
        bindings: {
            meter: '<?'
        }
    });

function meterController($routeParams, metersService) {
    // this.meter.csstype = this.meter.type.replace(/ /g, '-');
    this.$onInit = function() {
        var meter = this.meter;
        meter.date = new Date(meter.date);
        meter.csstype = meter.type.name.replace(/ /g, '-');
    };
    this.editable = false;

    this.edit = () => {
        this.editable = true;
    };

    this.save = () => {
        this.editable = false;
    };

    // if a separate view
    if ($routeParams.meterId) {
        this.meter = metersService.getMeter($routeParams.meterId);
    }
}