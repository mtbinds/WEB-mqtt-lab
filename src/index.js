import './index.css';

const url  = "ws://" + window.location.host+ "/socket";


// On pourrait utiliser un WebSocket pour se connecter au serveur MQTT
// Mais on préférera utiliser un bibliothèque spécifique au protocole. 
// 
// Ne pas utiliser directement une WebSocket...
const ws = new WebSocket(url);
ws.onclose = (event) => console.log("Direct connection closed. Cool!")
ws.onopen = (event) => {
  console.log("We are connected. But let's NOT use this connection because we want to use a MQTT library to handle the WebSocket.");
  ws.close()
};

