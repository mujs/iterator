module('fibonacciIterator', function () {
  'use strict';

  var fibonacciIterator = function (limit) {
    limit = limit || Infinity;
    var done = false;
    var next = function () { return !done; };
    var iteration;
    var value;
    var index = 0;

    var seed = [0, 1];
    
    var iterator = function () {
      if (index < 2) { value = seed[index]; }
      else {
        value = seed[0] + seed[1];
        seed[0] = seed[1];
        seed[1] = value;
      }

      iteration = { index: index, value: value };
      index = index + 1;
      if (index === limit) { done = true; }
      return iteration;
    };
    
    iterator.next = next;
    return iterator;
  };

  return fibonacciIterator;
});
