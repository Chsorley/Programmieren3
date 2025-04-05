import Empty from "./empty.js";
import GrassEater from "./GrassEater.js";
import { findNeighbourPositions, updateCreaturePosition } from "../utils.js";
import { matrix } from "../../gol/setup.js";

export default class MeatEater {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "red";
        this.energy = 100;
    }

    step() {
        this.trytoEat();
        if (this.energy >= 120) {
            this.multiply();
            this.energy -= 100;
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }

    trytoEat() {
        let preyFields = findNeighbourPositions(this.row, this.col, 1, GrassEater);
        if (preyFields.length > 0) {
            let newPos = preyFields[Math.floor(Math.random() * preyFields.length)];
            updateCreaturePosition(this, newPos);
            this.energy += 10;
        } else {
            this.energy--;
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let [row, col] = freeFields[Math.floor(Math.random() * freeFields.length)];
            matrix[row][col] = new MeatEater();
        }
    }
}
