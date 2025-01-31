const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database')
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the To-Do List API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// CREATE a new to-do item
app.post('/todos', (req, res) => {
    const { title } = req.body;
    const sql = 'INSERT INTO todos (title, complete) VALUES (?, ?)';
    const params = [title, false]; // Default to 'not completed'
  
    db.run(sql, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        title,
        completed: false,
      });
    });
  });
  
// READ all to-do items
app.get('/todos', (req, res) => {
    const sql = 'SELECT * FROM todos';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
  

// UPDATE a to-do item
app.put('/todos/:id', (req, res) => {
    const { title, complete } = req.body;
    const sql = 'UPDATE todos SET title = ?, complete = ? WHERE id = ?';
    const params = [title, complete, req.params.id];
  
    db.run(sql, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'To-do not found' });
      }
      res.json({
        id: req.params.id,
        title,
        complete,
      });
    });
  });
  
// DELETE a to-do item
app.delete('/todos/:id', (req, res) => {
    const sql = 'DELETE FROM todos WHERE id = ?';
    const params = [req.params.id];
  
    db.run(sql, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'To-do not found' });
      }
      res.status(204).send();
    });
  });
  
  