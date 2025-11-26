
const express = require("express");
const WebSocket = require("ws");
const chokidar = require("chokidar");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const server = app.listen(PORT, () => {
	console.log(`
     Live server ligado em: http://localhost:${PORT}
		`);
});

const wss = new WebSocket.server({ server });

wss.on("connection", (ws) => {
	console.log("Navegador conectado ao Live Reload!");
});

chokidar.watch("public").on("change", (filePath) => {
  console.log(`Alterado: ${filePath}`);
  wss.clients.forEach((client) => client.send("reload"));
});

