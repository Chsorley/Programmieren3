import Empty from "./empty.js";
import { findNeighbourPositions } from "../utils.js";
import { matrix } from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/matrix.js";
import { frameCount } from "../setup.js";


export default class Grass {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "green";
        this.energy = Math.floor(Math.random() * 3);
    }

    step() {
        this.energy++;
        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let [row, col] = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            matrix[row][col] = new Grass();
        }
    }
}
