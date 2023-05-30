import { gameBoard } from "./gameBoard";


export class GameInterface {
    private interface;
    private resetGameButton;
    private startStopGameButton;
    public closeSettings;
    public settings;
    public modal;
    public gameState;
    public game;
    public widthInput;
    public heightInput;

    constructor() {

        this.gameState = "stop";
        // this.frameCount = 0;
        // this.startTime = performance.now();

        this.game = new gameBoard();
        this.interface = document.querySelector(".interface");
        this.modal = document.querySelector(".data-settings-modal") as HTMLDialogElement;
        this.settings = document.querySelector(".data-open-settings-modal")
        this.resetGameButton = this.interface!.querySelector(".interface__restartGame");
        this.startStopGameButton = this.interface!.querySelector(".interface__startEndGame");
        this.closeSettings = this.modal!.querySelector(".data-close-settings-modal");
        this.widthInput = document.getElementById('n-width') as HTMLInputElement;
        this.heightInput = document.getElementById('n-height') as HTMLInputElement;
        // this.fpsCounter = this.interface.querySelector(".interface__fpsCounter");

        this.settings!.addEventListener('click', () => this.modal.showModal());
        this.closeSettings!.addEventListener('click', () => this.modal.close());
        this.resetGameButton!.addEventListener(('click'), () => this.resetGameCallback());
        this.startStopGameButton!.addEventListener(('click'), () => this.startStopGameCallback());
        this.modal!.addEventListener("close", () => this.onCloseModalCallback());

    }

    onCloseModalCallback = () => {
        this.heightInput.valueAsNumber < 1 ? this.heightInput.valueAsNumber = 1 : this.heightInput.valueAsNumber > 50 ? this.heightInput.valueAsNumber = 50 : undefined;
        this.widthInput.valueAsNumber < 1 ? this.widthInput.valueAsNumber = 1 : this.widthInput.valueAsNumber > 50 ? this.widthInput.valueAsNumber = 50 : undefined;
        this.game.setSize(this.heightInput.valueAsNumber, this.widthInput.valueAsNumber);
        this.game.createGrid();

    }

    resetGameCallback = () => {
        this.gameState = "stop";
        this.runGame();
        const cells = this.game.cells;
        for (let i: number = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.classList.contains('alive')) {
                cell.classList.remove('alive');
            }
        }
    }

    startStopGameCallback = () => {
        console.log(this.startStopGameButton);

        if (this.gameState === "stop") {
            this.gameState = "running";
        } else {
            this.gameState = "stop";
        }
        this.runGame();
    }

    // updateFPS = () => {
    //     this.frameCount++;
    //     const currentTime = performance.now();
    //     const elapsedTime = currentTime - this.startTime;
    //     if (elapsedTime >= 1000) {
    //         const fps = Math.round((this.frameCount * 1000) / elapsedTime);
    //         this.fpsCounter.textContent = `FPS: ${fps}`;
    //         this.frameCount = 0;
    //         this.startTime = currentTime;
    //     }
    //     requestAnimationFrame(this.updateFPS());
    // }

    runGame = async () => {
        if (this.gameState === "running") {
            this.startStopGameButton!.children[1].classList.remove("disabled");
            this.startStopGameButton!.children[0].classList.add("disabled");

            while (this.gameState === "running") {
                this.game.evolveGrid();
                await timeout(500);
            }
        }
        this.startStopGameButton!.children[0].classList.remove("disabled");
        this.startStopGameButton!.children[1].classList.add("disabled");
    }

}

const timeout = async (time: number) => await new Promise((resolve) => setTimeout(resolve, time));