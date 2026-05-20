const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { semana, area } = req.body;
            const result = await pool.query(
                'INSERT INTO ReportesSemanales (Semana, Area) VALUES ($1, $2) RETURNING Id',
                [semana, area]
            );
            res.status(200).json({ success: true, reporteId: result.rows[0].id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}