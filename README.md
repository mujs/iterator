Iterator
========

Extensible iteration system

Install
-------

    npm run update
    npm run dev

Usage
-----

An iterator is a function which gets no arguments and
returns an iteration object

```js
{ index, value }
```

An iterator function has a property `next` which is a
function returning `true` only when there are iterations left

### creating iterators

```js
var arrayIterator = function (array) {
  var done = false;
  var next = function () { return !done; };
  
  var index = 0;
  var length = array.length;
  
  var iterator = function () {
    var iteration = {
      index: index,
      value: array[index]
    };
    
    index = index + 1;
    if (index === length) { done = true; }
    return iteration;
  };
  
  iterator.next = next;
  return iterator;
};
```

### using iterators

```js
var each = function (iteratee, iterator) {
  var iteration;
  
  while (iterator.next()) {
    iteration = iterator();
    iteratee(iteration.value, iteration.index);
  }
};
```
