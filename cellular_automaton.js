var maxSize = 1000;

function cellularAutomatonSeed() {
  return [false, true, false];
}

// r: rule array, s: state array
// returns array
function cellularAutomaton(r, s) {
  while (s.length > maxSize) {
    s.shift();
    s.pop();
  }

  s_next = new Array(s.length + 2).fill(false);

  for (var i = 0, j = -1; i < s_next.length; i++, j++) {
    var prev = j > 0 ? s[j-1] : false,
      cur = j >= 0 && j < s.length ? s[j] : false,
      next = j < s.length - 1 ? s[j+1] : false;

    s_next[i] = evaluateCell(r, prev, cur, next);
  }
  return s_next;
}

function evaluateCell(r, prev, cur, next) {
  var idx = 7 - boolArrayToDecimal([prev, cur, next]);
  return r[idx];
}

function boolArrayToDecimal(array) {
  var num = 0;
  for (var i = 0; i < array.length; i++) {
    num = (num << 1) | array[i];
  }
  return num;
}

function parseStrAsRule(str) {
  var num = parseInt(str);
  var array = [];

  while (num > 0) {
    var bit = num % 2;
    var quot = Math.floor(num / 2);
    array.unshift(bit == 1);
    num = quot;
  }

  while (array.length > 8) {
    array.pop();
  }
  while (array.length < 8) {
    array.unshift(false);
  }
  return array;
}
