import Empty from "./empty.js";
import Grass from "./grass.js";
import { findNeighbourPositions, updateCreaturePosition } from "../utils.js";
import { matrix } from "../matrix.js";
import GrassBad from "./grass_bad.js";
import { frameCount } from "../setup.js";


export default class GrassEater {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "yellow";
        this.energy = 5;
    }

    step() {
        this.trytoEat();
        if (this.energy >= 10) {
            this.multiply();
            this.energy -= 5;
        } else if (this.energy <= 0) {
            matrix[this.row][this.col] = new Empty();
        }
    }

    trytoEat() {
        let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
        if (grassFields.length > 0) {
            let newPos = grassFields[Math.floor(Math.random() * grassFields.length)];
            updateCreaturePosition(this, newPos);
            
            this.energy++;
        } else {
            let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
            if (emptyFields.length > 0) {
                let newPos = emptyFields[Math.floor(Math.random() * emptyFields.length)];
                updateCreaturePosition(this, newPos);
            }
            this.energy--;
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let [row, col] = freeFields[Math.floor(Math.random() * freeFields.length)];
            matrix[row][col] = new GrassEater();
        }
    }
}
