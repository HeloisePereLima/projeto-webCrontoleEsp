import { onMessage, NIVEL_AGUA, STATUS_SOLO, STATUS_IRRIGACAO } from "../services/mqttClient.js";

let nivelAgua = "";
let statusSolo = "";
let statusIrrigacao = "";

// Recebendo dados via MQTT
onMessage(NIVEL_AGUA, (mensagem) => {
  nivelAgua = mensagem;
});

onMessage(STATUS_SOLO, (mensagem) => {
  statusSolo = mensagem;
});

onMessage(STATUS_IRRIGACAO, (mensagem) => {
  statusIrrigacao = mensagem;
});

class rotaIrrigacaoAutomatica {
  static lerIrrigacao(req, res) {
    try {
      console.log(`Dados Irrigação Automática - Nível Água: ${nivelAgua}, Status Solo: ${statusSolo}, Status Irrigação: ${statusIrrigacao}`);
      res.status(200).json({
        nivelAgua,
        statusSolo,
        statusIrrigacao
      });
    } catch (error) {
      res.status(500).json({ error: "Erro interno ao obter dados da irrigação" });
    }
  }
}

export default rotaIrrigacaoAutomatica;