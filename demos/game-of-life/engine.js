
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
    
    requestAnimationFrame(update)
    
    function update() {
        table = nextGeneration(table);
        drawTable(table, COLUMNS, ROWS, RESLUTION);
        requestAnimationFrame(update);
    }
})
