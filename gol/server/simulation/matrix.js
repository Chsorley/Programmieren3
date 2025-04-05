import Grass from "./entities/grass.js";
import GrassEater from "./entities/grass_eater.js";
import MeatEater from "./entities/meat_eater.js";
import Empty from "./entities/empty.js";

export let matrix = [];
export const matrixSize = 50;

const creatureProbabilities = [
    [Grass, 0.25],
    [GrassEater, 0.05],
    [MeatEater, 0.02],
];

export function getRandomCreature() {
    let rand = Math.random();
    let sum = 0;
    for (let [creatureClass, probability] of creatureProbabilities) {
        sum += probability;
        if (rand < sum) return new creatureClass();
    }
    return new Empty();
}

export function fillRandomMatrix() {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = getRandomCreature();
        }
    }
}
