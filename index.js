// Importiere das HTTP-Modul
import http from "http";
// Importiere das File System-Modul
import fs from "fs";

// Funktion zum Senden von Dateien an den Client
const sendFile = (path, res) => {
  // Lese den Inhalt der Datei am angegebenen Pfad
  fs.readFile(path, (err, data) => {
    // Überprüfe auf Fehler beim Lesen der Datei
    if (err) {
      // Wenn ein Fehler auftritt, sende eine Fehlermeldung an den Client
      res.end("Fehler beim Empfangen der Daten", err);
      return;
    }
    // Wenn der Pfad eine SVG-Datei ist, setze den Content-Type entsprechend
    if (path.includes(".svg")) {
      res.writeHead(200, { "Content-type": "image/svg+xml" });
    }
    // Sende den Inhalt der Datei an den Client
    res.end(data);
  });
};

// Funktion für die Verarbeitung von HTTP-Anfragen
const requestHandler = (req, res) => {
  // Gib die URL der Anfrage in der Konsole aus
  console.log(req.url);
  // Überprüfe die URL der Anfrage und handle sie entsprechend
  if (req.url === "/") {
    sendFile("./assets/index.html", res);
  } else if (req.url === "/about") {
    sendFile("./assets/about.html", res);
  } else if (req.url === "/contact") {
    sendFile("./assets/contact.html", res);
  } else if (req.url === "/faq") {
    sendFile("./assets/faq.html", res);
  } else if (req.url === "/main.css") {
    sendFile("./assets/main.css", res);
  } else if (req.url.endsWith(".svg")) {
    // Wenn die URL mit ".svg" endet, konstruiere den vollständigen Pfad und sende die Datei
    const filePath = "./assets" + req.url;
    sendFile(filePath, res);
  } else {
    // Wenn keine passende URL gefunden wird, sende einen 404-Statuscode
    res.writeHead(404);
    res.end("Not Found");
  }
};

// Erstelle einen HTTP-Server und weise ihm die "requestHandler"-Funktion zu
const server = http.createServer(requestHandler);

// Lausche auf dem Port 9999 und gib eine Nachricht aus, wenn der Server gestartet ist
server.listen(9999, () => console.log("Server funktioniert"));
