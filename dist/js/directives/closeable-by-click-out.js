'use strict';

angular.module('MeterioApp').directive('closeableByClickOut', function () {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      window.addEventListener('click', function (event) {
        if (!element) return;

        var elem = element[0]; // get raw HTML elem
        var isClickOutside = true;
        var target = event.target;

        do {
          if (target === elem) {
            isClickOutside = false;
            event.stopPropagation();
            break;
          }
        } while (target = target.parentElement);

        if (isClickOutside) {
          scope.isMenuShown = false; // outside
        }

        scope.$apply(); // digest loop
      });
    }
  };
});