import { matrix, matrixSize } from "./setup.js";

export function findNeighbourPositions(row, col, distance, creatureType) {
    let positions = [];
    for (let i = row - distance; i <= row + distance; i++) {
        for (let j = col - distance; j <= col + distance; j++) {
            let inBounds = i >= 0 && j >= 0 && i < matrixSize && j < matrixSize;
            if (inBounds && (i !== row || j !== col) && matrix[i][j] instanceof creatureType) {
                positions.push([i, j]);
            }
        }
    }
    return positions;
}

export function updateCreaturePosition(creature, newPos) {
    let [newRow, newCol] = newPos;
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

export function getTransformedMatrix(){
    let newMatrix=[]
    for(let i=0; i<matrix.length;i++){
        newMatrix.push([])
        for(let j=0; j<matrix[i].length; j++){
            let element = matrix[i][j]
            newMatrix[i][j]=element.color || "white"
        }
    }
    return newMatrix
}