import React, {useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TelaLed from './TelaLed';
import BoiaStatus from './BoiaStatus';
import SensorDHT from './SensorDHT';
import TelaSolo from './TelaSolo'
import IrrigacaoAutomaticao from './irrigacaoAutomatica'
import MonitorChuva from './monitorChuva';


export default function Principal(){
    const [menuAberto, setMenuAberto] = useState(false);

    return(
        <div className='flex h-screen font-sans'>
            <section className={`fixed z-30 insert-y-0 left-0 transform w-64
                 bg-gray-900 text-white p-4 transition-transform duration-300 
                 ease-in-out md:relative md:translate-x-0 
                 ${menuAberto ? "translate-x-0 " : '-translate-x-full'}`}>
                
                <div className='flexcjustify-between items-center mb-6'>
                    <span className='text-x1 font-bold'>Menu</span>
                    <button className='md:hidden' onClick={() => setMenuAberto(False)}> </button>
                </div>

                <nav className='space-y-4'>
                    <Link to="/TelaLed" onClick={() => setMenuAberto(false)} 
                    className='flex items-center gap-4 p-2 rounded hover:bg-gray-700'>
                         <span>Tela Led</span>
                    </Link>
                    <Link to="/BoiaStatus" onClick={() => setMenuAberto(false)} 
                    className='flex items-center gap-4 p-2 rounded hover:bg-gray-700'>
                        <span>Tela Boia</span>
                    </Link>
                    <Link to="/SensorDHT" onClick={() => setMenuAberto(false)} 
                    className='flex items-center gap-4 p-2 rounded hover:bg-gray-700'>
                        <span>Tela Temp e Umid</span>
                    </Link>
                    <Link to="/TelaSolo" onClick={() => setMenuAberto(false)} 
                    className='flex items-center gap-4 p-2 rounded hover:bg-gray-700'>
                        <span>Tela Solo</span>
                    </Link>
                    <Link to="/monitorChuva" onClick={() => setMenuAberto(false)} 
                    className='flex items-center gap-4 p-2 rounded hover:bg-gray-700'>
                        <span>Tela Monitor Chuva</span>
                    </Link>
                    <Link to="/irrigacaoAutomatica" onClick={() => setMenuAberto(false)} 
                    className='flex items-center gap-4 p-2 rounded hover:bg-gray-700'>
                        <span>Tela  irrigação Automatica</span>
                    </Link>
                </nav>
            </section>
            <section className='flex-1 p-6 bg-gray-100 text-black w-full overflow-auto'>
                <header>
                    <button className='text-gray-900 md:hidden'
                        onClick={() => setMenuAberto(true)}>
                        
                    </button>
                </header>
                <main>
                    <Routes>
                        <Route path='/TelaLed' element={<TelaLed/>}/>
                        <Route path='/BoiaStatus' element={<BoiaStatus/>}/>
                        <Route path='/SensorDHT' element={<SensorDHT/>}/>
                        <Route path='/TelaSolo' element={<TelaSolo/>}/>
                        <Route path='/MonitorChuva' element={<MonitorChuva/>}/>
                        <Route path='/IrrigacaoAutomatica' element={<IrrigacaoAutomaticao/>}/>
                    </Routes>
                </main>
            </section>

        </div>
    )
}