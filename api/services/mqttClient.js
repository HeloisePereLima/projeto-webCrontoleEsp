import mqtt from "mqtt";

//Configurações do broker
const MQTT_BROKER_HOST = '9d19cc700cc44018b16cc529b323fc9d.s1.eu.hivemq.cloud';
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = 'ricardodias';
const MQTT_PASSWORD = 'TesteSenai1';

//topicos mqtt
const TOPICO_STATUS = 'aulaLed/09/status';
const TOPICO_COMANDO_LED = 'aulaLed/09/estadoLed';
const STATUS_BOIA = "projeto/09/statusBoia";
// const STATUS_DHT = "projeto/09/statusDHT"
const UMIDADE = "projeto/09/umidade"
const TEMPERATURA = "projeto/09/temperatura"
const SENSOR_SOLO = "projeto/09/sensor_solo"
const CONDICAO_SOLO = "projeto/09/condicao_solo"

const status_monitorChuva = "projeto/09/statusMonitorChuva"

let mqttClient;
let subscriptions = {};

//conexao
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
};

function conectarMqtt(){
    console.log('Tentando conectar ao broker MQTT...');
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);

    mqttClient.on('connect', () =>{
        console.log('Conectado com sucesso!');
        mqttClient.subscribe(TOPICO_STATUS, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${TOPICO_STATUS}`);
            }
        })
         mqttClient.subscribe(TOPICO_COMANDO_LED, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${TOPICO_COMANDO_LED}`);
            }
        })
         mqttClient.subscribe(STATUS_BOIA, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${STATUS_BOIA}`);
            }
        })
        //  mqttClient.subscribe(STATUS_DHT, (err) =>{
        //     if(!err)
        //     {
        //         console.log(`Inscrito no tópico ${STATUS_DHT}`);
        //     }
        // })
         mqttClient.subscribe(UMIDADE, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${UMIDADE}`);
            }
        })
         mqttClient.subscribe(TEMPERATURA, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${TEMPERATURA}`);
            }
        })
         mqttClient.subscribe(SENSOR_SOLO, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${SENSOR_SOLO}`);
            }
        })
         mqttClient.subscribe(CONDICAO_SOLO, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${CONDICAO_SOLO}`);
            }
        })
         mqttClient.subscribe(status_monitorChuva, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${status_monitorChuva}`);
            }
        })
    })
    mqttClient.on('message', (topic, message) =>{
        //verificarse existe um topico na lista de assinaturas 
        if(subscriptions[topic]){
            subscriptions[topic](message.toString())
        }
    })
    mqttClient.on('error', (error) => console.error('Erro de conexao', error));
    mqttClient.on('close', () => console.error('Conexao MQTT fechada'));
}
function onMessage(topic, callback){
    subscriptions[topic] = callback
}

function publicar(topic, message){
    if(mqttClient && mqttClient.connected){
        mqttClient.publish(topic, message, {retain: true});
        console.log(`Publicado no topico ${topic}: ${message}`)
    }
    else{
        console.error('Error ao publicar, cliente nao esta conectando')
    }
}

conectarMqtt();

export{publicar, onMessage, TOPICO_STATUS, TOPICO_COMANDO_LED, STATUS_BOIA, UMIDADE, TEMPERATURA, CONDICAO_SOLO, SENSOR_SOLO}

