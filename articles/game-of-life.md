# Recreating the John Conway's Game of Life with JavaScript

## Introduction:

**Game of life** is a game desenvolved by **John Conway**. It is the most well-known example of a cellular automaton.

The game was created trying to reproduce the alterations and changes in groups of living beings, having applications in several areas of science.

First of all we need to know how that happen. The game follow some simple rules that are defined to each new **generation**; thus, based on an two-dimensional **board** pre-defined or random, ranging from fixed to chaotic patterns.

### The rules:

- Any live cell with fewer than two live neighbours dies, as if by underpopulation;
- Any live cell with two or three live neighbours lives on to the next generation;
- Any live cell with more than three live neighbours dies, as if by overpopulation;
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

![gamerules](/images/game-of-life/gamerules.jpg)

Knowing the history and the rules we can start develop the game!

## HTML, CSS

We will use **Canvas API** from **HTML** to create the table, wich allow us to create and render 2D or 3D forms.

First lets starting creating the HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Game of Life</title>
</head>
<body>
    <canvas id="table"></canvas>

    <script src="engine.js"></script>
</body>
</html>
```

We just need add in the `<body>` a `<canvas>` tag with a `id`, that will be our board (im calling table), and a `<script>` tag with our engine, this will work fine.

Now lets write a simple **CSS** (you can style it anyway you want)
I'll just reset the page, change the background color and center everything:

```css
* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #110b1a;
}
```

## Engine

First, lets define some constants to use along the code:

- WIDTH = Width of the table;
- HEIGHT = Height of the table;
- RESLUTION = Size of the cell;
- COLUMNS = Amount of columns;
- ROWS = Amount of rows;
- ALIVE_COLOR = The color of a alive cell;
- DEAD_COLOR = The color of a dead cell;

```js
const WIDTH = 500;
const HEIGHT = 500;
const RESLUTION = 5;
const COLUMNS = WIDTH / RESLUTION;
const ROWS = WIDTH / RESLUTION;

const ALIVE_COLOR = "#5c3ec9"
const DEAD_COLOR = "#f8f8f2"

...
```

Before we start to write the main code, we need to be sure the HTML is completely loaded.
We can do that encapsulating our code inside a `document.addEventListener` with `"DOMContentLoaded"` of parameter:

```js
...

document.addEventListener("DOMContentLoaded", () => {
    //Here we'll write our code
}

...
```

Now the code will only run after the HTML is loaded.

First step is create a reference to the canvas. If u remember, we created inside the HTML `<body>` a `<canvas>` with a `id=table`, we can assign this tag to a JavaScript variable with `document.querySelector()` with `#table` parameter.

Than we inform to canvas the context if this is a **2D** or a **3D** form:

```js
...

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#table");
    const ctx = canvas.getContext("2d");
}

...
```

So lets manipulate the canvas with the const that we have declated before, defining the width and height:

```js
...

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#table");
    const ctx = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

...
```

Next step is create a variable to storage all columns, rows, and the information of each cell.

To this we need to create a function `createTable(cols, rows)` that will recive the cols and rows, and its need to return a Array for the columns, another Array inside each column item to the rows, and each item need to recive a random num, they could be `0` or `1`:

```js
...

    function createTable(cols, rows) {
        return new Array(cols)
            .fill(null)
            .map(() =>
            new Array(rows).fill(null).map(() => Math.round(Math.random()))
        );
    }

    let table = createTable(COLUMNS, ROWS)

...
```

With the Array created, we need to run every item in the array, and draw the cells on canvas, to this we will verify, if the item contains `1` that means it is a alive cell or `0` a dead cell.

Lets create a function `drawTable(table, cols, rows, reslution)`, will recive some parameters needed.

First we need to clear the canvas, to replace the cells, canvas have a method called `context.clearRect(x, y, width, height)`, the two first parameters recive the position where the method will start to clear, and the last two parameters, recive where will stop to clear.

Now we run the array and replace with the colors, case `1` the cell will recive the `ALIVE_COLOR` else if `0` will recive `DEAD_COLOR`
To apply the color to the canvas we need two others methods, the first is `context.fillStyle` that recive the color, and `context.fillRect(x, y, width, height)`, that follow the same logic of `context.clearRect()`, however instead of cleaning its will apply the syle defined in the previuos fillRect method:

```js
...

    function drawTable(table, cols, rows, reslution) {
        ctx.clearRect(0, 0, cols, rows);
        for(let cellX = 0; cellX < cols; cellX++) {
            for(let cellY = 0; cellY < rows; cellY++) {
                const cell = table[cellX][cellY];
                ctx.fillStyle = cell ? ALIVE_COLOR : DEAD_COLOR
                ctx.fillRect(cellX * reslution, cellY * reslution, reslution, reslution)
            }
        }
    }

...
```

Now we already have the table with random cells, so thats the time to create a function that will run each item of Array and apply the conditions of life or dead, and create a new Array with the new generation of cells, that will be drawed in `drawTable` function.

Generation will be each cicle that the Array is generated again, the new Array need to inherit the older generation conditions, applied the new conditions.

Lets start with a new function that will called `nextGeneration(table)` and will recive the Array with parameter (will be our table), next step is create a varible `nextGeneration` to storage the new generation, thats prevent the older generation will not be modified:

```js
...

    function nextGeneration(table) {
        const nextGeneration = table.map((arr) => [ ...arr ]);
    }

...
```

So here we can start some loops to run along the Array and create some useful variables, `currentCell` will recive the current positions of the cell where the loop is, and `sumNeighbors` to storage the neighbor's cell amount:

```js
...

    function nextGeneration(table) {
        const nextGeneration = table.map((arr) => [ ...arr ]);

        for(let col = 0; col < table.length; col++) {
            for(let row = 0; row < table[col].length; row++) {
                const currentCell = table[col][row];
                
                let sumNeighbors = 0;
            }
        }
    }

...
```

Now we need to verify all the 8 neighbor's cell, case the neighbor is alive, its need to be concatenate in `sumNeighbors`.
To this we will run a `for` loop for `x` and `y` where will start at `-1` index to the `1` index.

![gamerules](/images/game-of-life/neighbor.jpg)

We can't forget to skip the current cell of array `cell[0][0]`, we only need the neighbors:

```js
...

    function nextGeneration(table) {
        const nextGeneration = table.map((arr) => [ ...arr ]);

        for(let col = 0; col < table.length; col++) {
            for(let row = 0; row < table[col].length; row++) {
                const currentCell = table[col][row];
                
                let sumNeighbors = 0;

                for(let cellX = -1; cellX < 2; cellX++) {
                    for(let cellY = -1; cellY < 2; cellY++) {
                        if(cellX === 0 && cellY === 0) {
                            continue;
                        }

                        const currentNeighbor = table[ col + cellX ][ row + cellY ];
                        sumNeighbors += currentNeighbor;
                    }
                }
            }
        }
    }

...
```

It is working, but we have a problem, in this method, when we have a cell on the margin of the table, the loop will try to find neighbors outside of our table, so we need to prevents this.

To this, we will create two new variables `X` and `Y` to get the real position of the neighbor's cell, so now we only concatenate the neighbors where is inside of our table.

```js
...

    function nextGeneration(table) {
        const nextGeneration = table.map((arr) => [ ...arr ]);

        for(let col = 0; col < table.length; col++) {
            for(let row = 0; row < table[col].length; row++) {
                const currentCell = table[col][row];
                
                let sumNeighbors = 0;

                 for(let cellX = -1; cellX < 2; cellX++) {
                    for(let cellY = -1; cellY < 2; cellY++) {
                        if(cellX === 0 && cellY === 0) {
                            continue;
                        }

                        const x = col + cellX;
                        const y = row + cellY;

                        if(x >= 0 && y >= 0 && x < COLUMNS && y < ROWS) {
                            const currentNeighbor = table[ col + cellX ][ row + cellY ];
                            sumNeighbors += currentNeighbor;
                        }
                    }
                }
            }
        }
    }

...
```

Now we already have the neighbors of the cell, so thats the time to apply the gamerules. 

```js
...

    function nextGeneration(table) {
        const nextGeneration = table.map((arr) => [ ...arr ]);

        for(let col = 0; col < table.length; col++) {
            for(let row = 0; row < table[col].length; row++) {
                const currentCell = table[col][row];
                
                let sumNeighbors = 0;

                for(let cellX = -1; cellX < 2; cellX++) {
                    for(let cellY = -1; cellY < 2; cellY++) {
                        if(cellX === 0 && cellY === 0) {
                            continue;
                        }

                        const x = col + cellX;
                        const y = row + cellY;

                        if(x >= 0 && y >= 0 && x < COLUMNS && y < ROWS) {
                            const currentNeighbor = table[ col + cellX ][ row + cellY ];
                            sumNeighbors += currentNeighbor;
                        }
                    }
                }

                if(currentCell === 0 && sumNeighbors === 3) {
                    nextGeneration[col][row] = 1;
                } else if(currentCell === 1 && (sumNeighbors < 2 || sumNeighbors > 3)) {
                    nextGeneration[col][row] = 0;
                }
            }
        }

        return nextGeneration;
    }

...
```

The first condition, means if the current cell is dead, and has 3 neighbors, that cell will be revived.
The second condition, means if the current cell is alive, and has only 1 neighbor or more than 3, that cell will die.

Than we just return the new generation.

So the game, is now almost ready, we just need to create a loop to refresh the generation, to this we will use a simple loop with a native JavaScript function `requestAnimationFrame(update)`, lets create a function named `update()` to execute our group of functions and repeat the loop:

```js
...

    requestAnimationFrame(update)
    
    function update() {
        table = nextGeneration(table);
        drawTable(table, COLUMNS, ROWS, RESLUTION);
        requestAnimationFrame(update);
    }

...
```

The game is now complete, lets check the code?

```js
const WIDTH = 500;
const HEIGHT = 500;
const RESLUTION = 5;
const COLUMNS = WIDTH / RESLUTION;
const ROWS = WIDTH / RESLUTION;

const ALIVE_COLOR = "#5c3ec9"
const DEAD_COLOR = "#f8f8f2"


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#table");
    const ctx = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    function createTable(cols, rows) {
        return new Array(cols)
            .fill(null)
            .map(() =>
            new Array(rows).fill(null).map(() => Math.round(Math.random()))
        );
    }

    let table = createTable(COLUMNS, ROWS)

    function drawTable(table, cols, rows, reslution) {
        ctx.clearRect(0, 0, cols, rows);
        for(let cellX = 0; cellX < cols; cellX++) {
            for(let cellY = 0; cellY < rows; cellY++) {
                const cell = table[cellX][cellY];
                ctx.fillStyle = cell ? ALIVE_COLOR : DEAD_COLOR
                ctx.fillRect(cellX * reslution, cellY * reslution, reslution, reslution)
            }
        }
    }

    function nextGeneration(table) {
        const nextGeneration = table.map((arr) => [ ...arr ]);

        for(let col = 0; col < table.length; col++) {
            for(let row = 0; row < table[col].length; row++) {
                const currentCell = table[col][row];
                
                let sumNeighbors = 0;

                for(let cellX = -1; cellX < 2; cellX++) {
                    for(let cellY = -1; cellY < 2; cellY++) {
                        if(cellX === 0 && cellY === 0) {
                            continue;
                        }

                        const x = col + cellX;
                        const y = row + cellY;

                        if(x >= 0 && y >= 0 && x < COLUMNS && y < ROWS) {
                            const currentNeighbor = table[ col + cellX ][ row + cellY ];
                            sumNeighbors += currentNeighbor;
                        }
                    }
                }

                if(currentCell === 0 && sumNeighbors === 3) {
                    nextGeneration[col][row] = 1;
                } else if(currentCell === 1 && (sumNeighbors < 2 || sumNeighbors > 3)) {
                    nextGeneration[col][row] = 0;
                }
            }
        }

        return nextGeneration;
    }
    
    requestAnimationFrame(update)
    
    function update() {
        table = nextGeneration(table);
        drawTable(table, COLUMNS, ROWS, RESLUTION);
        requestAnimationFrame(update);
    }
})
```

## Final Considerations

First of all, i need to thank @OffensiveBrasil for the pictures and suport.

Some videos that inspired me to write this article:

- [An Introduction to Conway's The Game of Life](https://www.youtube.com/watch?v=ouipbDkwHWA)
- [Neat AI Does Conways AI Life - Allowing a neural network evolve its own patterns](https://www.youtube.com/watch?v=viA-HIW-2C4)
- [Stephen Hawkings The Meaning of Life (John Conway's Game of Life segment)](https://www.youtube.com/watch?v=CgOcEZinQ2I)

You can check the code on this same repository: [Game of Life](/demos/game-of-life)

I hope you enjoyed it and that you were able to learn something cool.

Thanks to read my article, and remember this:

“One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don't throw it away.” -Stephen Hawking.

See you :two_hearts:.