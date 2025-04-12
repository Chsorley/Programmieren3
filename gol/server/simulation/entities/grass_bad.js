import Grass from "./grass.js";
import { findNeighbourPositions } from "../utils.js";
import { matrix } from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/matrix.js";

export default class BadGrass extends Grass {
    constructor() {
        super();
        this.color = "lime";
        this.energy = 0;
    }

    step() {
        if (Math.random() < 0.5) {
            this.energy++;
        }

        if (this.energy >= 10) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Grass);
        if (emptyFields.length > 0) {
            let [row, col] = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            matrix[row][col] = new BadGrass();
        }
    }
}
