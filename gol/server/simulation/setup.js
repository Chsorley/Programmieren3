import { fillRandomMatrix, matrixSize, matrix } from "./matrix.js";
import Empty from "./entities/empty.js";

export function setup() {
    //createCanvas(matrixSize * 15, matrixSize * 15);
    fillRandomMatrix();
    //frameRate(30);
}

const blockSize = 15;
export let frameCount = 0

export function draw() {
    // console.log("is running")
    //background(200); // Hintergrundfarbe festlegen
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col]; // Objekt an der aktuellen Position

            // Leere Zellen überspringen
            if (obj instanceof Empty) continue;

            // Zeile und Spalte der Kreatur setzen
            obj.row = row;
            obj.col = col;

            // Verhindert, dass neu erstellte Kreaturen im gleichen Schritt aktualisiert werden
            // und dass Kreaturen, die sich bewegen, mehrfach in einem Frame aktualisiert werden
            if (obj.stepCount === frameCount) {

                obj.step(); // Kreatur führen ihren Schritt aus
                obj.stepCount++;
            }

            // Kreatur zeichnen
            //fill(obj.color); // Farbe der Kreatur setzen
            //rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize); // Rechteck zeichnen
        }
    }
    frameCount++
}
