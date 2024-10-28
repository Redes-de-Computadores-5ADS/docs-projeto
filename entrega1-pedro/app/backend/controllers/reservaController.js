import { pool } from '../db.js';
import * as dotenv from 'dotenv';
dotenv.config();


export const getReservas = async (req, res) => {

        const q = "SELECT * FROM reserva;";

        let conn;

        try {
            conn = await pool.getConnection();
            const [rows] = await conn.query(q);
            return res.status(200).json(rows);
        } catch (err) {
            return res.json(err);
        } finally {
            if (conn) conn.release();
        }
};

export const addReserva = async (req, res) => {

        const q = "INSERT INTO reserva(nome_sala, local_sala, data_uso, hora_inicio_uso, hora_final_uso, responsavel, motivo_uso, info_gerais, convidados) VALUES (?,?,?,?,?,?,?,?,?)";

        let conn;

        const values = [
            req.body.nome_sala,
            req.body.local_sala,
            req.body.data_uso,
            req.body.hora_inicio_uso,
            req.body.hora_final_uso,
            req.body.responsavel,
            req.body.motivo_uso,
            req.body.info_gerais,
            req.body.convidados,
        ];

        try {
            conn = await pool.getConnection();
            await conn.query(q, values);
            return res.status(200).json("Reserva criada com sucesso.");
        } catch (err) {
            console.error("Erro ao inserir no banco de dados:", err);
            return res.status(500).json(err);
        } finally {
            if (conn) conn.release();
        }
    
};
