import { publicar, onMessage, TOPICO_COMANDO_LED, TOPICO_STATUS } from "../services/mqttClient.js";

let ultimoStatus = 'Desconhecido';
let ultimoEstadoLed = 'Desconhecido';

//registrar a funcao de escuta para o topico de status
onMessage(TOPICO_STATUS, (mensagem) =>{
    ultimoStatus = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_STATUS}: ${ultimoStatus}`);
});

onMessage(TOPICO_COMANDO_LED, (mensagem) =>{
    ultimoEstadoLed = mensagem;
    console.log(`Mensagem recebida no ${TOPICO_COMANDO_LED}: ${ultimoEstadoLed}`);
});

class rotaLed{
    static async lerStatus(req, res){
        try{
            console.log(`Status: ${ultimoStatus}`)
            res.status(200).json({
                status: ultimoStatus,
                estadoLed: ultimoEstadoLed
            })
        }catch(error){
            console.error('error ao obter Status', error);
            res.status(500).json({message: 'Error ao obter status'})
        }
    }

    static enviarComando(req, res){
        const { comando } = req.body

        try{
            //publicar o topico assinado
            publicar(TOPICO_STATUS, comando)
            const estadoLed = comando  === 'LIGADO' ? '1' : '0';
            publicar(TOPICO_COMANDO_LED, estadoLed);
            res.status(200).json({message: `Comando ${comando} enviado com sucesso!`})
        }catch(error){
            res.status(500).json({message: "Erro ao enviar comando"});
        }
    }
}

export default rotaLed

