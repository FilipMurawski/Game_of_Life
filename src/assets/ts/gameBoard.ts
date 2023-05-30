export class gameBoard {
    private width: number;
    private height: number;
    private board;
    private grid: Array<Array<HTMLElement>>;
    private doc: Document;
    public cells;
    constructor(height: number = 50, width: number = 50) {
        this.height = height;
        this.width = width;
        this.doc = document;
        this.board = this.doc.querySelector(".gameBoard__gridContainer") as HTMLElement;
        this.grid = [];
        this.cells = this.board!.getElementsByClassName("cell");

    }
    setSize = (height: number, width: number) => {
        this.height = height;
        this.width = width;
    }
    createGrid = () => {
        this.grid = [];
        this.board!.innerHTML = "";
        this.board!.style.gridTemplateColumns = `repeat(${this.width}, 15px)`;
        for (let row: number = 0; row < this.height; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.width; col++) {
                const cell: HTMLDivElement = document.createElement('div');
                cell.classList.add('cell');
                this.board!.appendChild(cell);
                this.grid[row][col] = cell;
                cell.addEventListener('click', () => {
                    cell.classList.toggle('alive');
                });
            }
        }
        console.log(this.grid);
        console.log(this.board);
    }

    getCell = (row: number, col: number) => {
        if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
            const index: number = row * this.width + col;
            return this.cells[index];
        }
        return null;
    }

    countLiveNeighbors = (row: number, col: number) => {
        let count: number = 0;
        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow: number = row + i;
                const newCol: number = col + j;
                const neighborCell = this.getCell(newRow, newCol);
                if (neighborCell && neighborCell.classList.contains('alive')) {
                    count++;
                }
            }
        }
        return count;
    }

    evolveGrid = () => {
        type myArray = {
            element: Element;
            liveNeighbors: number;
        }
        const cellsAndAlive: Array<myArray> = []
        for (let i: number = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            const row: number = Math.floor(i / this.width);
            const col: number = i % this.width;
            const aliveN: number = this.countLiveNeighbors(row, col);
            const elem: myArray = { element: cell, liveNeighbors: aliveN }
            cellsAndAlive.push(elem)
        }
        console.log(cellsAndAlive);

        for (let i: number = 0; i < cellsAndAlive.length; i++) {
            const cell = cellsAndAlive[i].element;
            const liveNeighbors: number = cellsAndAlive[i].liveNeighbors;
            if (cell !== undefined && cell.classList.contains('alive')) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    cell.classList.remove('alive');
                }
            } else {
                if (liveNeighbors === 3) {
                    cell.classList.add('alive');
                }
            }
        }
    }


}