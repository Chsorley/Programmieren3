import Grass from "./grass.js";
import BadGrass from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/entities/grass_bad.js";
import Empty from "./empty.js";
import { matrix } from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/matrix.js";
import { findNeighbourPositions, updateCreaturePosition } from "../utils.js";
import { frameCount } from "../setup.js";

export default class GrassEater {
    constructor() {
        this.stepCount = frameCount +1;
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
        let neighborFields = findNeighbourPositions(this.row, this.col, 1, Object);

        let edibleFields = neighborFields.filter(([r, c]) => {
            let obj = matrix[r][c];
            return obj instanceof Grass || obj instanceof BadGrass;
        });

        if (edibleFields.length > 0) {
            let [r, c] = edibleFields[Math.floor(Math.random() * edibleFields.length)];
            let target = matrix[r][c];

            if (target instanceof Grass) {
                this.energy++;
            } else if (target instanceof BadGrass) {
                this.energy += Math.random() < 0.5 ? 1 : -3;
            }

            updateCreaturePosition(this, [r, c]);
        } else {
            let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
            if (emptyFields.length > 0) {
                let [r, c] = emptyFields[Math.floor(Math.random() * emptyFields.length)];
                updateCreaturePosition(this, [r, c]);
            }
            this.energy--;
        }
    }


    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let [r, c] = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            matrix[r][c] = new GrassEater();
        }
    }
}
