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
We add in body a <canvas> tag with a **id**, that will be our board (im calling table), and a <script> tag with our engine, that will do it works.

Now lets write a simple **CSS** (you can style anyway you want)
I'll just reset the page, change the background color and center everything

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
We can do that encapsulating ours code inside a EventListener with "DOMContentLoaded" of paramter:

```js
document.addEventListener("DOMContentLoaded", () => {
    //Here we'll write our code
}
```