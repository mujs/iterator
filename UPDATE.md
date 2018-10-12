```js
/**
 * iterator.js
 *
 * > An iterator is any object which implements the Iterator protocol by having
 * a next() method which returns an object with two properties: value, the next
 * value in the sequence; and done, which is true if the last value in the
 * sequence has already been consumed. If value is present alongside done, it is
 * the iterator's return value.
 *
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators>
 *
 */

var { inc } = require('./number.js');
var { is } = require('./is.js');


/**
 * Operators
 *
 * Receive and return an iterator
 *
 *   * map
 *   * filter
 *   * reduce
 */

var map = function (iterator, iteratee) {
  var isDone = false;

  var next = function () {
    if (isDone) { return { done: true }; }
    var iteration = iterator.next();
    isDone = iteration.done;

    return iteratee(iteration);
  };

  return { next: next }
};

var filter = function (iterator, predicate) {
  var isDone = false;

  var next = function () {
    if (isDone) { return { done: true }; }
    var iteration = iterator.next();
    isDone = iteration.done;

    if (predicate(iteration)) { return iteration; }
    return next();
  };

  return { next: next };
};

var reduce = function (iterator, reducer, seed) {
  var isDone = false;
  var acc = seed;

  var next = function () {
    if (isDone) { return { done: true }; }
    var iteration = iterator.next();
    isDone = iteration.done;

    iteration.acc = acc;
    acc = reducer(iteration);

    if (isDone) { return { value: acc, done: true }; }
    return next();
  };

  return { next: next };
};

/**
 * Iterator creation
 *
 * Receive a value and return an iterator based on it
 *
 *   * fromArray
 *   * fromObject
 */

var fromArray = function (array) {
  var length = array.length;

  var iteration = {
    index: -1,
    value: null,
    done: false
  };

  var next = function () {
    if (iteration.done) { return { done: true }; }

    iteration.index = inc(iteration.index);
    iteration.value = array[iteration.index];
    iteration.done = iteration.index >= length;

    return iteration;
  };

  return { next: next };
};

var fromObject = function (object) {
  var keys = Object.keys(object);
  var keysLength = keys.length;
  var keyIndex = -1;

  var iteration = {
    index: null,
    value: null,
    done: false
  };

  var next = function () {
    if (iteration.done) { return { done: true }; }
    keyIndex = inc(keyIndex);

    iteration.index = keys[keyIndex];
    iteration.value = object[iteration.index];
    iteration.done = keyIndex >= keysLength;

    return iteration;
  };

  return { next: next };
};

var fromList = function (list) {
  if (is.array(list)) { return fromArray(list); }
  if (is.object(list)) { return fromObject(list); }
  throw new Error(`TypeError: ${list} is not a List`);
};

var fromTree = function (tree, path) {
  var list = fromList(tree);
  var isDone = false;
  if (!is.defined(path)) { path = []; }

  var next = function () {
    if (isDone) { return { done: true }; }
    var { value, index, done: isDone } = list.next();

    if (is.list(value)) { return; }

    return {
      index: path.concat(index),
      value: value,
      done: isDone
    };
  };

  return { next: next };
};

module.exports = {
  map: map,
  filter: filter,
  reduce: reduce,
  fromArray: fromArray,
  fromObject: fromObject,
  fromList: fromList,
  fromTree: fromTree
};
```
