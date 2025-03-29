class Empty { }

// Startenergie: Jedes Gras beginnt mit einer zufälligen Energiemenge zwischen 0 und 2.
// Energiegewinn: In jedem Zyklus (Frame) erhöht sich die Energie des Grases um 1.
// Fortpflanzung: Erreicht das Gras eine Energie von 7 oder mehr, pflanzt es sich fort.
// Es sucht in seiner unmittelbaren Umgebung (Nachbarfelder) nach leeren Feldern.
// Wenn leere Felder vorhanden sind, wird zufällig eines ausgewählt.
// Auf diesem leeren Feld wird ein neues Grasobjekt erstellt.
// Die Energie des ursprünglichen Grases wird nach der Fortpflanzung auf 0 zurückgesetzt.
class Grass {

    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "green"; // Jede Kreatur braucht eine Farbe
        this.energy = int(random(3));
        // Hier kannst du weitere Eigenschaften hinzufügen
    }

    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        this.energy++

        // Wenn das Gras 7 Energie hat, multipliziere und setze die Energie zurück
        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        // Suche nach leeren Nachbarzellen
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        // Wenn es mindestens eine leere Zelle gibt,
        // wähle eine zufällige aus und erstelle ein neues Grasobjekt
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new Grass();
        }
    }
}

// Startenergie: Jeder Grasfresser beginnt mit einer Energie von 5.
// Nahrungssuche: In jedem Zyklus sucht der Grasfresser in seiner unmittelbaren Umgebung nach Nahrung.
// Gras gefunden:
// Der Grasfresser bewegt sich auf das Feld, auf dem sich das Gras befindet.
// Dadurch wird das Gras "gefressen" und der Grasfresser erhält 1 Energiepunkt dazu.
// Kein Gras gefunden:
// Der Grasfresser sucht nach einem leeren Feld in seiner Umgebung.
// Wenn ein leeres Feld gefunden wird, bewegt sich der Grasfresser dorthin.
// Da keine Nahrung gefunden wurde, verliert der Grasfresser 1 Energiepunkt.
// Fortpflanzung: Erreicht der Grasfresser eine Energie von 10 oder mehr, pflanzt er sich fort.
// Er sucht nach einem leeren Feld in seiner Umgebung.
// Wenn ein leeres Feld gefunden wird, wird dort ein neuer Grasfresser erstellt.
// Der ursprüngliche Grasfresser verliert 5 Energiepunkte durch die Fortpflanzung.
// Tod: Sinkt die Energie des Grasfressers auf 0 oder weniger, stirbt er und das Feld, auf dem er sich befand, wird leer.
class GrassEater {
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "yellow"; // Jede Kreatur braucht eine Farbe
        this.energy = 5;
        // Hier kannst du weitere Eigenschaften hinzufügen
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
            let randomGrassField = random(grassFields);
            updateCreaturePosition(this, randomGrassField);
            this.energy++;
        } else {
            let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
            if (emptyFields.length > 0) {
                let randomEmptyField = random(emptyFields);
                updateCreaturePosition(this, randomEmptyField);
            }
            this.energy--;
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let randomFreeField = random(freeFields);
            let row = randomFreeField[0];
            let col = randomFreeField[1];
            matrix[row][col] = new GrassEater();
        }
    }

}

// Startenergie: Jeder Fleischfresser beginnt mit einer Energie von 100.
// Nahrungssuche: In jedem Zyklus sucht der Fleischfresser in seiner unmittelbaren Umgebung nach Nahrung.
// Grasfresser gefunden:
// Der Fleischfresser bewegt sich auf das Feld, auf dem sich der Grasfresser befindet.
// Dadurch wird der Grasfresser "gefressen" und der Fleischfresser erhält 10 Energiepunkte dazu.
// Kein Grasfresser gefunden:
// Der Fleischfresser kann kein leeres Feld suchen, sondern verliert 1 Energiepunkt.
// Fortpflanzung: Erreicht der Fleischfresser eine Energie von 120 oder mehr, pflanzt er sich fort.
// Er sucht nach einem leeren Feld in seiner Umgebung.
// Wenn ein leeres Feld gefunden wird, wird dort ein neuer Fleischfresser erstellt.
// Der ursprüngliche Fleischfresser verliert 100 Energiepunkte durch die Fortpflanzung.
// Tod: Sinkt die Energie des Fleischfressers auf 0 oder weniger, stirbt er und das Feld, auf dem er sich befand, wird leer.
class MeatEater {
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "red"; // Jede Kreatur braucht eine Farbe
        this.energy = 100;
        // Hier kannst du weitere Eigenschaften hinzufügen
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
        let preyFields = findNeighbourPositions(this.row, this.col, 1, GrassEater);
        if (preyFields.length > 0) {
            let randomGrassField = random(preyFields);
            updateCreaturePosition(this, randomGrassField);
            this.energy += 10;
        } else {
            this.energy--;
        }
    }

    multiply() {
        let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (freeFields.length > 0) {
            let randomFreeField = random(freeFields);
            let row = randomFreeField[0];
            let col = randomFreeField[1];
            matrix[row][col] = new GrassEater();
        }
    }
}

// Liste von Listen. Enthält alle Kreaturen.
let matrix = [];
// Größe der Matrix, Anzahl der Zellen in Breite und Höhe
let matrixSize = 50;
// Anzeigengröße in Pixeln für jede Zelle
let blockSize = 15;

// Wahrscheinlichkeit, mit der jede Kreatur erstellt wird
let creatureProbabilities = [
    [Grass, 0.25], // Gras: 25% Wahrscheinlichkeit
    [GrassEater, 0.05], // Grasfresser: 5% Wahrscheinlichkeit
    [MeatEater, 0.02], // Fleischfresser: 2% Wahrscheinlichkeit
];

// Wählt basierend auf den Wahrscheinlichkeiten zufällig eine Kreatur aus
function getRandomCreature() {
    let rand = random(); // Zufallszahl zwischen 0 und 1
    let sum = 0;
    for (let i = 0; i < creatureProbabilities.length; i++) {
        let creatureClass = creatureProbabilities[i][0];
        let probability = creatureProbabilities[i][1];
        sum += probability; // Summiert die Wahrscheinlichkeiten
        if (rand < sum) { // Wenn die Zufallszahl kleiner ist, wähle diese Kreatur
            return new creatureClass();
        }
    }
    return new Empty(); // Wenn keine andere Bedingung zutrifft, wird ein leeres Feld zurückgegeben
}

// Füllt die Matrix zufällig mit Kreaturen basierend auf den Wahrscheinlichkeiten
function fillRandomMatrix() {
    for (let i = 0; i <= matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j <= matrixSize; j++) {
            matrix[i][j] = getRandomCreature();
        }
    }
}

// Aktualisiert die Position einer Kreatur in der Matrix
// Erstellt ein neues leeres Objekt an der alten Position
function updateCreaturePosition(creature, newPos) {
    if (matrix[creature.row][creature.col] !== creature) {
        let creatureType = creature.constructor.name;
        let message = `Ein ${creatureType}-Kreatur soll bewegt werden, aber befindet sich nicht mehr in der Matrix.\
Das liegt wahrscheinlich daran, dass sie zuvor "gestorben" ist und die Position bereits\
von einer anderen Kreatur eingenommen wurde. Nachdem eine Kreatur "stirbt", sollte sie\
sich nicht mehr bewegen. Wahrscheinlich hast du die Logik fürs sterben vor der logik fürs\
fressen/bewegen in der step() Methode. Versuche, die Logik fürs sterben ganz ans Ende der\
step() Methode zu verschieben oder verwende ein return, um die Methode nach dem Sterben zu beenden.`;
        throw new Error(message);
    }
    let newRow = newPos[0];
    let newCol = newPos[1];
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

// Für eine gegebene Position werden alle Nachbarpositionen gesucht,
// die einen bestimmten Kreaturentyp enthalten und innerhalb einer bestimmten Distanz liegen
// Gibt eine Liste von [row, col]-Positionen zurück
// Beispiel: findNeighbourPositions(10, 10, 1, Empty) gibt alle leeren Zellen
// um die Position 10, 10 im Abstand von 1 zurück.
// Wenn alle Zellen leer sind, wird [[9, 9], [9, 10], [9, 11], [10, 9], [10, 11], [11, 9], [11, 10], [11, 11]] zurückgegeben
function findNeighbourPositions(row, col, distance, creatureType) {
    let positions = [];
    for (let i = row - distance; i <= row + distance; i++) {
        for (let j = col - distance; j <= col + distance; j++) {
            let istInMatrix = i >= 0 && j >= 0 && i < matrixSize && j < matrixSize;

            if (istInMatrix && (i != row || j != col) && matrix[i][j] instanceof creatureType) {
                positions.push([i, j]);
            }
        }
    }
    return positions;
}

// Initialisiert die Zeichenfläche und füllt die Matrix mit Kreaturen
// Wird einmal beim Start aufgerufen
function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize); // Zeichenfläche erstellen
    fillRandomMatrix(); // Matrix zufällig füllen
    noStroke(); // Keine Umrandungen für Rechtecke
    frameRate(30); // Bildrate auf 30 Frame pro Sekunde setzen
}

// Spielschleife. Wird in jedem Frame aufgerufen
// Zeichnet die Matrix und aktualisiert die Kreaturen
function draw() {
    background(200); // Hintergrundfarbe festlegen
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
            fill(obj.color); // Farbe der Kreatur setzen
            rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize); // Rechteck zeichnen
        }
    }
}