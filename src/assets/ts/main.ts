import { GameInterface } from "./gameInterface";

async function mainGame() {
    const gameIF = new GameInterface();
    gameIF.game.createGrid();
}

mainGame();