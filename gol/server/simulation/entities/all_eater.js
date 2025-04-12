import Empty from "./empty.js";
import GrassEater from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/entities/grass_eater.js";
import GrassEaterTank from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/entities/grass_eater_tank.js"
import MeatEater from "./meat_eater.js";
import Grass from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/entities/grass.js"
import { findNeighbourPositions, updateCreaturePosition } from "../utils.js";
import { matrix } from "/Users/chsorley/Desktop/Programmieren3/gol/server/simulation/matrix.js";
import { frameCount } from "../setup.js";
import BadGrass from "./grass_bad.js";



export default class AllEater {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "pink";
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
            return obj instanceof GrassEater || obj instanceof GrassEaterTank || obj instanceof MeatEater || obj instanceof Grass || obj instanceof BadGrass;
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
            }else if (target instanceof MeatEater){
                if (Math.random() < 0.5){
                    this.energy += 50
                }else{
                    this.energy = 0
                }
            }else if(target instanceof Grass || target instanceof BadGrass){
                this.energy++
                updateCreaturePosition(this, [r, c]);
            }
        }
    }
    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let [row, col] = freeFields[Math.floor(Math.random() * freeFields.length)];
            matrix[row][col] = new AllEater();
        }
    }
}
