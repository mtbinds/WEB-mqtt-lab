import './index.css';
import './sensor';
import {Sensor} from "./sensor";

const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://hyperespaceb1.univ-lehavre.fr:8080');

const sensors = [];

const ul = document.getElementById('messages');

client.on('connect', function () {
  console.log('oui');
  client.subscribe('value/+');
});

client.on('message', function (topic, message) {
  let id = topic.split('/')[1];
  let jsonMessage = JSON.parse(message.toString());
  let sensorExist = false;


  for(let s of sensors){
    if(s.id === id){
      s.update(jsonMessage.value);
      let show = s.toString().split('\n');
      console.log(show);
      document.getElementById('nom' + s.id).textContent = show[0];
      document.getElementById('rel' + s.id).textContent = show[1];
      document.getElementById('avg' + s.id).textContent = show[2];
      sensorExist = true;
    }
  }

  if(sensorExist === false){
    let newSensor = createSensor(id, jsonMessage)
    sensors.push(newSensor);
    let li = document.createElement('li');
    let nom = document.createElement('p');
    let rel = document.createElement('p');
    let avg = document.createElement('p');
    li.id = newSensor.id;
    nom.id = 'nom' + newSensor.id;
    rel.id = 'rel' + newSensor.id;
    avg.id = 'avg' + newSensor.id;
    li.append(nom, rel, avg);
    ul.appendChild(li);
  }

});

function createSensor(id, data){
  let sensorData = [{
    "id": id,
    "name": data.name,
    "type": data.type,
    "value": data.value
  }];
  return Sensor.createSensors(sensorData);
}




