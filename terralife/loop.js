

var textures = [];
var pixels = [];

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

var frames = 0;
var stepFrames = 0;

function loop() {

    // limit speed of simulation
    if(frames % stepFrames === 0) {
        world.step();
        updateGrid(pixels, world, textures);
        renderer.render(stage);
    }

    requestAnimationFrame(loop);

    frames++;
};
requestAnimationFrame(loop);
