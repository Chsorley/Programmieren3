// Code wird erst ausgeführt, wenn das HTML komplett geladen ist
document.addEventListener('DOMContentLoaded', () => {
    console.log("HTML geladen. Client-Skript startet.");

    // Stellt die Verbindung zum Socket.IO Server her
    // (läuft auf dem gleichen Server, von dem die HTML-Seite kam)
    const socket = io();
    // Zugriff auf HTML-Elemente holen
    const messageInput = document.getElementById('messageInput');   
    const sendButton = document.getElementById('sendButton');
    const chatContainer = document.getElementById('chat-container'); // Den brauchen wir gleich auch
    // Event Listener für den Senden-Knopf
    sendButton.addEventListener('click', sendMessage);


    // --- HIER KOMMEN SPÄTER UNSERE CLIENT-SOCKET.IO SACHEN HIN ---

    // 1. Was passiert, wenn die Verbindung erfolgreich ist?
    socket.on('connect', () => {
        console.log("✅ Verbunden mit Server! Meine ID:", socket.id);
        // Wir könnten hier eine Nachricht im Chat anzeigen, dass verbunden wurde
        // displayMessage("Verbunden mit dem Chat!", "system"); // (Funktion kommt später)
        displayMessage("Verbunden mit dem Chat-Bot!", "system");
    });

    // 2. Was passiert, wenn die Verbindung verloren geht?
    socket.on('disconnect', () => {
        console.log("❌ Verbindung zum Server verloren!");
        // Wir könnten hier eine Nachricht im Chat anzeigen
        // displayMessage("Verbindung verloren.", "system"); // (Funktion kommt später)
    });


    // Hier werden wir später auf Antworten vom Server lauschen ('response')
    // und Nachrichten senden ('message')

    // HIER EINFÜGEN: Lauschen auf 'response'-Events vom Server
    socket.on('response', (aiAntwort) => {
        console.log("Antwort vom Server erhalten:", aiAntwort);
        displayMessage(aiAntwort, 'ai'); // Server-Antwort anzeigen (links, grau)
    });

    // --- BIS HIER ---
    // In der sendMessage Funktion:
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            console.log("Sende Nachricht:", messageText);
            socket.emit('message', messageText); // An Server senden

            // HIER ÄNDERN/EINFÜGEN: Eigene Nachricht im Chat anzeigen
            displayMessage(messageText, 'user');

            messageInput.value = '';
            messageInput.focus();
        } else {
            console.log("Leere Nachricht, wird nicht gesendet.");
        }
    }

        // Funktion, um eine Nachricht im Chat-Fenster anzuzeigen
    function displayMessage(text, senderType) {
        const messageDiv = document.createElement('div'); // Erzeugt ein <div> Element
        messageDiv.textContent = text; // Setzt den Text sicher (verhindert HTML-Injection)

        // Fügt eine CSS-Klasse hinzu, je nachdem wer gesendet hat
        // ('user' für uns, 'ai' für den Bot, 'system' für Hinweise)
        messageDiv.classList.add(senderType + '-message'); // z.B. 'user-message' oder 'ai-message'

        // Fügt das neue Nachrichten-Div zum Chat-Container hinzu
        chatContainer.appendChild(messageDiv);

        // Scrollt den Chat automatisch nach unten, um die neueste Nachricht zu sehen
        chatContainer.scrollTop = chatContainer.scrollHeight;
}

}); // Ende von DOMContentLoaded
