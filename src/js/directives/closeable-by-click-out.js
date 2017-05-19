angular
  .module('MeterioApp')
  
  .directive('closeableByClickOut', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        window.addEventListener('click', (event) => {
          if (!element) return;
          
          let elem = element[0]; // get raw HTML elem
          let isClickOutside = true;
          let target = event.target;
          
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