import http from "http";
import fs from "fs";
import path from "path";

// Funktion zum Senden von Dateien an den Client
const sendFile = (filePath, res) => {
  // Lese den Inhalt der Datei am angegebenen Pfad
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.end("Interner Serverfehler");
      return;
    }

    // Bestimme den Inhaltstyp anhand der Dateierweiterung
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "text/html"; // Standardmäßig HTML

    if (ext === ".svg") {
      contentType = "image/svg+xml";
    } else if (ext === ".css") {
      contentType = "text/css";
    } else if (ext === ".ttf") {
      contentType = "font/ttf"; //Fonts
    }

    // Setze den Antwortheader mit dem Inhaltsverzeichnis
    res.writeHead(200, { "Content-Type": contentType });

    res.end(data);
  });
};

// Funktion für die Verarbeitung von HTTP-Anfragen
const requestHandler = (req, res) => {
  // Gib die URL der Anfrage in der Konsole aus
  console.log(req.url);

  // Baue den Dateipfad für die angeforderte Datei
  const filePath = `.${req.url}`;

  // Behandle spezifische Pfade
  if (filePath === "/" || filePath === "./index.html") {
    sendFile("./assets/index.html", res);
  } else if (
    filePath === "./about_us.html" ||
    filePath === "./categories.html" ||
    filePath === "./how.html" ||
    filePath === "./testimony.html"
  ) {
    sendFile(`./assets${req.url}`, res);
  } else if (filePath === "./css/styles.css") {
    sendFile("./assets/css/styles.css", res);
  } else if (
    filePath.startsWith("./img/") &&
    (filePath.endsWith(".svg") || filePath.endsWith(".png"))
  ) {
    sendFile(`./assets${req.url}`, res);
  } else if (
    filePath.startsWith("../fonts/Nunito/") &&
    filePath.endsWith(".ttf")
  ) {
    sendFile(`./assets${req.url}`, res);
  } else {
    // Wenn kein passender Pfad gefunden wird, sende den Statuscode 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Nicht gefunden");
  }
};

// Erstelle einen HTTP-Server und weise ihm die "requestHandler"-Funktion zu
const server = http.createServer(requestHandler);

// Lausche auf dem Port 9898 und gib eine Nachricht aus, wenn der Server gestartet ist
server.listen(9898, () =>
  console.log("Server funktioniert auf http://localhost:9898/")
);
// !Version unten funktionier nur HOME, der rest nur zu die navigieren aber css wird nicht erkannt und svg auch nicht mehr

// import http from "http";
// import fs from "fs";

// const sendFile = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.end("error");
//     }
//     if (path.includes(".svg")) {
//       res.writeHead(200, { "Content-type": "image/svg+xml" });
//     }
//     res.end(data);
//   });
// };

// const requestHandler = (req, res) => {
//   console.log("Ein neuer Request: ", req.url, req.method);

//   if (req.url === "/") {
//     sendFile("./assets/index.html", res);
//   } else {
//     const filePath = "./assets" + req.url;
//     sendFile(filePath, res);
//   }
// };

// const server = http.createServer(requestHandler);

// server.listen(9898, () => {
//   console.log("test");
// });
