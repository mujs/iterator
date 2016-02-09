module('each', function () {
  'use strict';

  var each = function (iteratee, iterator) {
    var iteration;
    var exit;
    
    while (iterator.next()) {
      iteration = iterator();
      exit = iteratee(iteration.value, iteration.index);
      if (typeof exit !== 'undefined') { return exit; }
    }
  };

  return each;
});
