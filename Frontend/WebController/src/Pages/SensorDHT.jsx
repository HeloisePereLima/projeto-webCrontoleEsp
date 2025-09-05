import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function SensorDHT() {
    const [temperatura, setTemperatura] = useState("20");
    const [umidade, setUmidade] = useState("16");

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/DHT`);
            const dados = await resposta.json();
            setTemperatura(dados.temperatura);
            setUmidade(dados.umidade);
        } catch (error) {
            console.log('Erro ao buscar dados', error);
        }
    }
      useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000)
        return () => clearInterval(intervalo)
    })

    return(
        <div className="mb-4 p-8 bg-gray-200 rounded w-75 h-75 justify-center ">
            <h1 className="text-xl font-bold text-center mb-4">Dados DHT</h1>
            <p className="text-center mt-4 font-medium">
                Temperatura: {temperatura}°C
            </p>
            <p className="text-center mt-4 font-medium">
                Umidade: {umidade}%
            </p>
             <div className="flex justify-center mt-4">
                <a href="https://wokwi.com/projects/439915076138600449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-green-600 rounded text-white"
                >
                    Acessar Wokwi
                </a>
            </div>
        </div>
    )
}