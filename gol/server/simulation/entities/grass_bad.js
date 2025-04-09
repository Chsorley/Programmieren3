import Empty from "./empty.js";
import { findNeighbourPositions } from "../utils.js";
import { matrix } from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/matrix.js";
import { frameCount } from "../setup.js";


export default class GrassBad{
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "lime";
        this.energy = 1;
    }

    step() {
        this.energy++;
        if (this.energy >= 9) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let [row, col] = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            matrix[row][col] = new GrassBad();
        }
    }
}

