import React, {useState, useEffect} from "react";
import { useNavigate, useNavigation } from "react-router-dom"
import { enderecoServidor } from "../../utils";

export default function TelaLed(){
    const navigate = useNavigate()
    const [status, setStatus] = useState("Desconhecido")

    const buscarStatus = async() =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/api/status`);
            const dados = await resposta.json();
            setStatus(dados.status);
        }catch(error){
            console.log('Erro ao buscar status', error);
        }
    }

    const enviarComando = async(comando) =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/api/comando`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({comando}),
            })
                const dados = await resposta.json()
                console.log(dados.message)
                buscarStatus()
        }catch(error){
            console.log('erro ao enviar comando', error)

        }
    }

    useEffect(() =>{
        buscarStatus()
        const intervalo = setInterval(buscarStatus, 5000);
        return() => clearInterval(intervalo);
    })

    return(
        <div className='mb-8 p-4 bg-gray-200 rounded'>
            <h1 className='text-4xl font-bold text-black mb-4'>Controle do LED</h1> 
            <div>
                <p>Status Atual:<span> {status}</span></p>
            </div> 
            <button className="bg-sky-500 text-white px-4 py-2 rounded gap-50" onClick={() => enviarComando("Ligado")}> Ligar</button>
            <button className="bg-red-700 text-white px-4 py-2 rounded gap-10" onClick={() => enviarComando("Desligado")}> Desligar</button>
        </div>
    )
}