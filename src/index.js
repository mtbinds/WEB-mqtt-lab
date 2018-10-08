import './index.css';

// On pourrait utiliser un WebSocket pour se connecter au serveur MQTT
// Mais on préférera utiliser un bibliothèque spécifique au protocole. 
// 
// Ne pas utiliser directement une WebSocket...
const ws = new WebSocket("ws://" + window.location.host+ "/socket");
ws.onopen = (event) => {
  console.log("We are connected.");
};
