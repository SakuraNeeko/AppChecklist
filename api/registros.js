const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { reporteId, colaborador, desyeme, encanastado, firmaBase64 } = req.body;
            await pool.query(
                `INSERT INTO RegistrosDiarios (ReporteId, Colaborador, Desyeme, Encanastado, FirmaBase64) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [reporteId, colaborador, desyeme, encanastado, firmaBase64]
            );
            res.status(200).json({ success: true, message: "Registro guardado exitosamente" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
};