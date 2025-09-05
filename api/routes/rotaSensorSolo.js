import { onMessage, SENSOR_SOLO, CONDICAO_SOLO } from "../services/mqttClient.js";

let condicaoSolo = "";
let sensorUmidade = "";

onMessage(SENSOR_SOLO, (mensagem) => {
    sensorUmidade = mensagem
})

onMessage(CONDICAO_SOLO, (mensagem) => {
    condicaoSolo = mensagem
})

class rotaSensorSolo{
    static lerDadosSensor(req, res){
        try{
            console.log(`Obtendo dados do sensor - umidade: ${sensorUmidade}%, condicao solo:${condicaoSolo} `)
            res.status(200).json({
                condicaoSolo: condicaoSolo,
                sensorUmidade: sensorUmidade
            });
        } catch (error) {
            console.error({error: 'erro interno ao obter status'})
        }
    }
}
export default rotaSensorSolo