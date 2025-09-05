import { onMessage, status_monitorChuva } from "../services/mqttClient.js";

let statusMonitorChuva = "";

onMessage(status_monitorChuva, (mensagem) =>{
    statusMonitorChuva = mensagem;
});

class monitorChuva{
    static lerStatusMonitor(req, res){
        try{
            res.status(200).json({
                statusMonitorChuva
            })
        }catch(error){
            res.status(500).json({message: 'Erro interno ao obter status'})
        }
    }
}

export default monitorChuva