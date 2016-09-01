var context;
var savedStates = [];
var maxStates = 10;
var gameLoop;
var config;

function init() {
  window.location.hash = "";
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    context = canvas.getContext("2d");
  }
  registerHandlers();
}

function registerHandlers() {
  document.getElementById("go").addEventListener("click", updateHash);
  document.getElementById("stop").addEventListener("click", stop);
  window.onhashchange = play;
}

function updateHash() {
  var unparsedRule = document.getElementById("rule").value;
  window.location.hash = unparsedRule;
}

function play() {
  var unparsedRule = window.location.hash.replace("#", "");
  var num = parseInt(unparsedRule);
  if (num >= 0 && num <= 255) {
    document.getElementById("rule").value = unparsedRule;
    var rule = parseStrAsRule(unparsedRule);
    startGame(context, rule);
  }
}

function stop() {
  if (gameLoop !== undefined) {
    clearInterval(gameLoop);
    gameLoop = undefined;
  }
}

function startGame(context, rule) {
  if (gameLoop !== undefined) {
    clearInterval(gameLoop);
    gameLoop = undefined;
  }

  config = {
    dims: [canvas.width, canvas.height],
    size: [2, 2],
    padding: [0, 0]
  };
  savedStates = [];
  maxStates = canvas.height / config.size[1];

  state = cellularAutomatonSeed();
  savedStates.push(state);

  gameLoop = setInterval(function() {playLoop(context, rule);}, 10);
}

function playLoop(context, rule) {
  drawAll(context, rule);
  while (savedStates.length > maxStates) {
    savedStates.shift();
  }
  
  var nextState = cellularAutomaton(rule, savedStates[savedStates.length - 1]);
  savedStates.push(nextState);
}

function drawAll(context, rule) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < savedStates.length; i++) {
    drawRow(context, savedStates[i], i);
  }
}

function drawRow(context, cells, row) {
  for (var x = 0; x < cells.length; x++) {
    if (cells[x] === false) {
      continue;
    }

    var pos = [
      x * (config.size[0] + config.padding[0]) +
        (config.dims[0] / 2 - cells.length * (config.size[0] + config.padding[0]) / 2),
      row * (config.size[1] + config.padding[1])
    ];

    context.fillStyle = "rgb(100, 100, 100)";
    context.fillRect(
      pos[0],
      pos[1],
      config.size[0],
      config.size[1]);
  }
}
