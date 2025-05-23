import Empty from "./empty.js";
import GrassEater from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/entities/grass_eater.js";
import GrassEaterTank from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/entities/grass_eater_tank.js"
import { findNeighbourPositions, updateCreaturePosition } from "../utils.js";
import { matrix } from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/matrix.js";
import { frameCount } from "../setup.js";



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
        let neighborFields = findNeighbourPositions(this.row, this.col, 1, Object);

        let edibleFields = neighborFields.filter(([r, c]) => {
            let obj = matrix[r][c];
            return obj instanceof GrassEater || obj instanceof GrassEaterTank;
        });

        if (edibleFields.length > 0) {
            let [r, c] = edibleFields[Math.floor(Math.random() * edibleFields.length)];
            let target = matrix[r][c];

            if (target instanceof GrassEater) {
                this.energy++;
                updateCreaturePosition(this, [r, c]);
            } else if (target instanceof GrassEaterTank) {
                if (Math.random() < 0.5) {
                    this.energy += 20
                    updateCreaturePosition(this, [r, c]);
                } else {
                    this.energy -= 20
                }
            }
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
