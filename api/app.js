import express from "express";
import cors from "cors";
import rotaLed from "./routes/rotaLed.js";
import rotaBoia from "./routes/rotaBoia.js";
//import rotaSensorDHT from "./routes/rotaSensorDHT.js"
import rotaSensorSolo from "./routes/rotaSensorSolo.js";
import rotaMonitorChuva from "./routes/rotaMonitorChuva.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('API no ar')
})

//rota para leitura do status
app.get('/api/status', rotaLed.lerStatus);
app.post('/api/comando', rotaLed.enviarComando)

//rota boia
app.get('/api/statusBoia', rotaBoia.lerStatus)

//rota DHT
// app.get('/api/statusDHT', rotaSensorDHT.lerStatus)

app.get('/api/sensorUmidade', rotaSensorSolo.lerDadosSensor)

app.get('/api/statusMonitorChuva', rotaMonitorChuva.lerStatusMonitor)

const porta = 3000;
app.listen(porta, () =>{
    console.log(`Servidor iniciado http://localhost:${porta}`);
})