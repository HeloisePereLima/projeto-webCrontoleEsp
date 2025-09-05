import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils"; // Certifique-se que enderecoServidor está definido

export default function IrrigacaoAutomatica() {
    const [nivelAgua, setNivelAgua] = useState("");
    const [statusSolo, setStatusSolo] = useState("");
    const [statusIrrigacao, setStatusIrrigacao] = useState("");

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/irrigacaoAutomatica`);
            const dados = await resposta.json();
            setNivelAgua(dados.nivelAgua);
            setStatusSolo(dados.statusSolo);
            setStatusIrrigacao(dados.statusIrrigacao);
        } catch (error) {
            console.log("Erro ao buscar dados da irrigação", error);
        }
    };

    useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000); // Atualiza a cada 5 segundos
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="max-w-xs mx-auto p-4 bg-white rounded shadow-md">
            <h1 className="text-xl font-bold text-center mb-4">Monitoramento - Irrigação Automática</h1>
           
            <p className="text-center mt-4 font-medium">
                Nível de Água: {nivelAgua}
            </p>
            <p className="text-center mt-2 font-medium">
                Status do Solo: {statusSolo}
            </p>
            <p className="text-center mt-2 font-medium">
                Status da Irrigação: {statusIrrigacao}
            </p>

            <a
                href="https://wokwi.com/projects/441183585030287361"
                className="block text-center mt-4 text-white hover:underline p-3 bg-green-600 rounded"
            >
                Acesse pelo link do projeto
            </a>
        </div>
    );
}