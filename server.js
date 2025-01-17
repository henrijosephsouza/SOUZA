require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configuration PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Servir les fichiers statiques

// Route pour ajouter un prospect
app.post('/prospect', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO prospects (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json({ message: 'Prospect ajouté avec succès', prospect: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du prospect' });
  }
});
app.get('/prospects', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM prospects');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des prospects.' });
    }
  });
  app.put('/prospect/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, comments } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE prospects SET name = $1, email = $2, phone = $3, comments = $4 WHERE id = $5 RETURNING *',
        [name, email, phone, comments, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Prospect introuvable.' });
      }
      res.status(200).json({ message: 'Prospect mis à jour avec succès.', prospect: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du prospect.' });
    }
  });
  app.delete('/prospect/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM prospects WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Prospect introuvable.' });
      }
      res.status(200).json({ message: 'Prospect supprimé avec succès.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la suppression du prospect.' });
    }
  });
      
// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
