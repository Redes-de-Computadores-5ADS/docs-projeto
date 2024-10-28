import express from "express";
import cors from "cors";
import reservaRoutes from "./routes/reservas.js";
import bodyParser from "body-parser";
import 'dotenv/config';


const app = express();

app.use(bodyParser.json());
app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/", reservaRoutes);

app.listen(8800,() =>{
    console.log("Servidor iniciado na porta 8800");
})