'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promise = new Promise(function (resolve, reject) {
  if (resolve) {
    resolve('This promise has a resolution');
  } else {
    reject(Error('Promise rejected'));
  }
});

promise.then(function (val) {
  return console.log(val);
}, function (err) {
  return console.log(err);
});

var wait = function wait(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};

var pa = wait(3000);
var pb = wait(5000);

var pc = pb.then(function () {
  console.log('Waited 5 seconds');
  return 42;
}).catch(function (err) {
  console.log(err);
});

var pd = pa.then(function () {
  console.log('Waited 3 seconds');
  return 'nein';
});

pc.then(function (val) {
  console.log(val);
  return 80;
}).then(function (val) {
  return console.log(val);
}); // 42 80

pd.then(function (val) {
  return console.log(val);
}); // 'nein'

Promise.all([pa, pb]).then(function () {
  return console.log('Waited 5 seconds as well');
});

Promise.all([pc, pd, pc, pc, pc, pd, pd, pd]).then(function (result) {
  return console.log(result);
});

Promise.race([pc, pd]).then(function (val) {
  return console.log(val);
}); // 'nein'

var writeFile = function writeFile(fileName, data) {
  return new Promise(function (resolve, reject) {
    return _fs2.default.writeFile(fileName + '.json', JSON.stringify(data), function (err) {
      return err ? reject(Error(err)) : resolve('File saved successfully');
    });
  });
};

writeFile('test', { greeting: 'Hello', id: 1 }).then(function (val) {
  return console.log(val);
}, function (err) {
  return console.log(err);
});

var readFile = function readFile(fileName) {
  return new Promise(function (resolve, reject) {
    return _fs2.default.readFile(fileName, function (err, data) {
      return err ? reject(Error(err)) : resolve(['Hey it worked', JSON.parse(data)]);
    });
  });
};

readFile('test.json').then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      val1 = _ref2[0],
      val2 = _ref2[1];

  return console.log(val1, val2);
}).catch(function (err) {
  return console.log(err);
});