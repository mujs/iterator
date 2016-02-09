module(function (use) {
  'use strict';

  var each = use('each');
  var arrayIterator = use('arrayIterator');
  var fibonacciIterator = use('fibonacciIterator');

  var log = function (value, index) {
    console.log({ value: value, index: index });
  };

  console.log('arrayIterator([1, 2, 3])');
  each(log, arrayIterator([1, 2, 3]));

  console.log('fibonacciIterator(15)');
  each(log, fibonacciIterator(15));
});
