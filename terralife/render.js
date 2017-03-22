
function example_gameOfLife() {

    var world = new CAWorld({
        width: 96,
        height: 64,
        cellSize: 6
    });

    world.palette = [
        '68, 36, 52, 1',
        '255, 255, 255, 1'
    ];

    world.registerCellType('living', {
        getColor: function () {
            return this.alive ? 0 : 1;
        },
        process: function (neighbors) {
            var surrounding = this.countSurroundingCellsWithValue(neighbors, 'wasAlive');
            this.alive = surrounding === 3 || surrounding === 2 && this.alive;
        },
        reset: function () {
            this.wasAlive = this.alive;
        }
    }, function () {
        //init
        this.alive = Math.random() > 0.5;
    });

    world.initialize([
        { name: 'living', distribution: 100 }
    ]);

    return world;
}
var g_currentExample = 'example_gameOfLife'
var g_nextExample = 'example_gameOfLife'
window.onload = function() {
    $('.exampleLink').on('click', function (evt) {
        loadExample($(this).attr('data-example'));
    });
    $('#btnReloadExample').on('click', function (evt) {
        loadExample(g_currentExample);
    });
    $('#btnApplyChanges').on('click', function (evt) {
        applyCodeChanges();
    });
    $('#numFrames').on('change', function (evt) {
        changeStepFrames();
    });

    loadExample('example_gameOfLife');
    //g_nextExample = 'example_lava';
    //loadExample('lava');

    var myCanvas, ctx, renderer, stage, meter, textures, pixels;

    var frames = 0;
    var world;
    function loop() {

        if (g_nextExample !== null) {
            try {
                world = window[g_nextExample]();

                myCanvas = document.getElementById('myCanvas');
                myCanvas.width = world.cellSize * world.width;
                myCanvas.height = world.cellSize * world.height;

                //renderer = PIXI.autoDetectRenderer(myCanvas.width, myCanvas.height, { view: myCanvas });
                renderer = renderer || new PIXI.autoDetectRenderer(myCanvas.width, myCanvas.height, myCanvas, null, true);

                // create the root of the scene graph
                //stage = new PIXI.Container();
                stage = stage || new PIXI.Stage(0xFFFFFF);

                textures = [];
                pixels = [];

                var textureCanvas = document.createElement('canvas');
                textureCanvas.width = world.cellSize * world.palette.length;
                textureCanvas.height = world.cellSize;
                var textureCtx = textureCanvas.getContext('2d');
                for (var i=0; i<world.palette.length; i++) {
                    textureCtx.fillStyle = 'rgba(' + world.palette[i] + ')';
                    textureCtx.fillRect(i*world.cellSize, 0, world.cellSize, world.cellSize);
                }
                var baseTexture = new PIXI.BaseTexture.fromCanvas(textureCanvas);
                for (var i=0; i<world.palette.length; i++) {
                    textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(i*world.cellSize, 0, world.cellSize, world.cellSize)));
                }


                drawGrid(pixels, world, stage, textures);

                $('#btnApplyChanges').removeClass('btn-danger');
                $('#btnApplyChanges').addClass('btn-success');
            } catch (ex) {
                console.log(ex);
                $('#btnApplyChanges').removeClass('btn-success');
                $('#btnApplyChanges').addClass('btn-danger');
            }
            g_nextExample = null;
        }
        // limit speed of simulation
        if(frames % g_stepFrames === 0) {
            world.step();
            updateGrid(pixels, world, textures);
            renderer.render(stage);
        }

        requestAnimationFrame(loop);

        frames++;
    };

    changeStepFrames();
    requestAnimationFrame(loop);
}

var g_stepFrames = 1;
function changeStepFrames() {
    g_stepFrames = parseInt($('#numFrames').val(), 10);
}

function loadExample(example) {
    g_currentExample = example;
    g_nextExample = 'example_' + example;
    $('#exampleCode').removeClass("prettyprinted").text(window[g_nextExample].toString());
    $('#exampleName').text(example);
    PR.prettyPrint();

    // turn off spell check
    var exampleDiv = $('#exampleCode')[0];
    exampleDiv.spellcheck = false;
    exampleDiv.focus();
    exampleDiv.blur();
}

function applyCodeChanges() {
    var exampleText = $('#exampleCode').text();
    var lines = exampleText.split('\n');
    lines.pop();
    lines.shift();
    window.example_userCreated = new Function(lines.join('\n'));
    loadExample('userCreated');
}

function updateGrid(pixels, world, textures) {

    for (var y=0; y<world.height; y++) {
        for (var x = 0; x < world.width; x++) {
            var newColor = world.grid[y][x].getColor();
            if (newColor !== world.grid[y][x].oldColor) {
                pixels[x + y*world.width].setTexture(textures[newColor]);
                world.grid[y][x].oldColor = newColor;
            }
        }
    }
}

function drawGrid(pixels, world, stage, textures) {
    try {
        stage.removeChildren();
    } catch (ex) { console.log(ex); }
    for (var y=0; y<world.height; y++) {
        for (var x=0; x<world.width; x++) {
            var sprite = new PIXI.Sprite(textures[0]);
            pixels[x + y*world.width] = sprite;
            sprite.x = x*world.cellSize;
            sprite.y = y*world.cellSize;
            stage.addChild(sprite);
        }
    }
}