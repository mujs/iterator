module('arrayIterator', function () {
  'use strict';

  var arrayIterator = function (array) {
    var done = false;
    var next = function () { return !done; };
    
    var index = 0;
    var length = array.length;
    
    var iterator = function () {
      var iteration = { index: index, value: array[index] };
      index = index + 1;
      if (index === length) { done = true; }
      return iteration;
    };
    
    iterator.next = next;
    return iterator;
  };

  return arrayIterator;
});
