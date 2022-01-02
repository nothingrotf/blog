# Recreating the John Conway's Game of Life with JavaScript

## Introduction:

**Game of life** is a game desenvolved by **John Conway**. It is the most well-known example of a cellular automaton.

The game was created trying to reproduce the alterations and changes in groups of living beings, having applications in several areas of science.

First of all we need to know how that happen. The game follow some simple rules that are defined to each new **generation**; thus, based on an image on a two-dimensional **board** pre-defined or random, ranging from fixed to chaotic patterns.

### The rules:

- Any live cell with fewer than two live neighbours dies, as if by underpopulation;
- Any live cell with two or three live neighbours lives on to the next generation;
- Any live cell with more than three live neighbours dies, as if by overpopulation;
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Knowing the history and the rules we can start develop the game

## HTML, CSS

We will use **Canvas API** of **HTML** to create the table, wich allow us to create and render 2D or 3D forms.

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
We add in body a `<canvas>` tag with a `id`, that will be our board (im calling table), and a `<script>` tag with our engine, that will do it works.

Now lets write a simple **CSS** (you can style anyway you want)
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

We need to define some constants to use along the code:

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
We can do that encapsulating ours code inside a `document.addEventListener` with `"DOMContentLoaded"` of parameter:

```js
...

document.addEventListener("DOMContentLoaded", () => {
    //Here we'll write our code
}

...
```
Now the code ill only run after the HTML is loaded, first step is create a reference to the canvas.
If u remember, we created inside the HTML `<body>` a `<canvas>` with a `id=table`, we can assign this tag to a JavaScript const with `document.querySelector()` with `#table` parameter.

Than we inform to canvas the context if this is a **2D** or a **3D** form:

```js
...

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#table");
    const ctx = canvas.getContext("2d");
}

...
```
So lets manipulate the canvas with the const that we have declated before:

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
With the Array created, we need to run every item in the array, and draw the cells on `canvas`, to this we will verify, if the item contains `1` that means it is a alive cell or `0` a dead cell.

Lets create a function `drawTable(table, cols, rows, reslution)`, will recive some parameters needed.

First need to clear the canvas, to replace the cells, canvas have a method called `context.clearRect(x, y, width, height)`, the two first parameters recive the position where the method will start to clear, and the last two parameters, recive where will stop to clear.

Now we run the array and replace with the colors, case `1` the cell will recive the `ALIVE_COLOR` else if `0` will recive `DEAD_COLOR`
To apply the color to the canvas we have two methods, the first is `context.fillStyle` that recive the color, and `context.fillRect(x, y, width, height)`, that follow the same logic of `context.clearRect()`:

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