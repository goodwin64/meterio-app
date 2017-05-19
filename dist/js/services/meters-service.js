'use strict';

angular.module('MeterioApp').service('metersService', function ($http) {
    var serverPath = '/api';
    var metersList = [];

    this.getMetersList = function () {
        return $http({
            method: "GET",
            url: 'server/meters.json'
        }).then(function success(response) {
            return response.data;
        }, function error(response) {
            return response.statusText;
        });

        // TODO: add client-server connection (now mock data)
        // return $http({
        //     method: "GET",
        //     url: `${serverPath}/item`
        // }).then(function success(response) {
        //     return response.data;
        // }, function error(response) {
        //     return response.statusText;
        // });
    };

    this.getMeter = function (id) {
        return $http({
            method: "GET",
            url: serverPath + '/item/' + id
        }).then(function success(response) {
            return response.data;
        }, function error(response) {
            return response.statusText;
        });
    };

    this.setMeter = function (id, data) {
        $http({
            method: "PUT",
            url: serverPath + '/Item/' + id,
            data: data
        }).then(function success(response) {}, function error(response) {
            metersList = response.statusText;
        });
    };
});

function dateTimeRetriever(key, value) {
    var dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?$/;

    if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
    }

    return value;
}

// mock data:
// '[{"index":0,"date":"2017-04-25T10:04:09","amount":734485,"type":"electricity"},{"index":1,"date":"2012-05-18T02:24:23","amount":701332,"type":"electricity"},{"index":2,"date":"2013-08-26T08:27:20","amount":992605,"type":"electricity"},{"index":3,"date":"2010-03-16T08:00:15","amount":446022,"type":"electricity"},{"index":4,"date":"2013-04-30T03:57:59","amount":947442,"type":"cold-water"},{"index":5,"date":"2010-06-14T02:54:17","amount":38928,"type":"cold-water"},{"index":6,"date":"2015-11-04T08:54:30","amount":779255,"type":"hot-water"},{"index":7,"date":"2010-01-31T04:07:16","amount":111757,"type":"hot-water"},{"index":8,"date":"2014-11-02T10:27:33","amount":841644,"type":"cold-water"},{"index":9,"date":"2013-07-27T10:10:15","amount":391725,"type":"electricity"},{"index":10,"date":"2010-09-02T01:41:14","amount":278979,"type":"cold-water"},{"index":11,"date":"2010-06-16T02:55:43","amount":581396,"type":"hot-water"},{"index":12,"date":"2015-09-19T12:24:10","amount":36174,"type":"cold-water"},{"index":13,"date":"2013-04-29T06:21:51","amount":35322,"type":"hot-water"},{"index":14,"date":"2011-03-27T07:54:12","amount":438238,"type":"hot-water"}]'