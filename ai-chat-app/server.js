// 1. Benötigte Module laden
const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); // Wichtig für socket.io v3+

// 2. Server aufsetzen
const app = express();
const server = http.createServer(app);
const io = new Server(server); // Socket.IO an den HTTP-Server binden

const PORT = 3000;

// 3. "public" Ordner bereitstellen
// Express soll alle Dateien aus dem 'public' Ordner direkt an den Browser senden können
// Wenn der Browser "/" anfragt, wird automatisch public/index.html gesendet!
app.use(express.static('public'));

// --- HIER KOMMEN SPÄTER DIE SOCKET.IO SACHEN HIN ---
// 4. Lauschen auf neue Verbindungen
io.on('connection', (socket) => {
  // 'socket' repräsentiert die Verbindung zu EINEM Client
  console.log('Ein Benutzer hat sich verbunden:', socket.id);

  // 5. Was passiert, wenn der Benutzer die Verbindung trennt?
  socket.on('disconnect', () => {
    console.log('Benutzer hat die Verbindung getrennt:', socket.id);
  });

  // HIER EINFÜGEN: Lauschen auf 'message'-Events vom Client
  socket.on('message', (empfangeneNachricht) => {
    console.log(`Nachricht von ${socket.id}: ${empfangeneNachricht}`);

    // Später werden wir hier die AI fragen und eine Antwort senden!
    // const antwort = "..."
    // socket.emit('response', antwort);
    const antwort = `Der Server sagt: Du hast "${empfangeneNachricht}" geschrieben!`;
    // 'response' ist der Name des Events für Antworten vom Server
    socket.emit('response', antwort);
  });
  // Hier werden wir später auf Nachrichten vom Client lauschen ('message')
  // und Antworten senden ('response')

});
// --- BIS HIER ---

// 6. Server starten
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf <http://localhost>:${PORT}`);
});
