import { useState, useEffect } from 'react';
import { enderecoServidor } from '../../utils';

export default function SensorSolo() {
    const [umidadeSolo, setUmidadeSolo] = useState(null);
    const [erro, setErro] = useState(null);

    const buscarUmidadeSolo = async () => {
            const resposta = await fetch(`${enderecoServidor}/api/umidadeSolo`);
            const json = await resposta.json();
            setUmidadeSolo(json.umidadeSolo);
        }

    useEffect(() => {
        buscarUmidadeSolo();
        const intervalo = setInterval(buscarUmidadeSolo, 5000); // Atualiza a cada 5 segundos
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="max-w-xs mx-auto p-4">
            <h1 className="text-xl font-bold text-center mb-4">Umidade do Solo</h1>
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-3xl">
                        🌱 {umidadeSolo !== null ? `${umidadeSolo}%` : '---'}
                    </div>
                </div>
            <div className="flex justify-center mt-4">
                <a href="https://wokwi.com/projects/440011725569557505"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-green-600 rounded text-white"
                >
                    Acessar Wokwi
                </a>
            </div>
        </div>
    )}
