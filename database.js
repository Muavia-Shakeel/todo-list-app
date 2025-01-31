const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo-list.db', (err) => {
    if (err) {
        console.error('Could not connect to the database', err);
    } else {
        console.log('Connected to the SQLite database');
        
    }
});

// Create the todos table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    complete BOOLEAN NOT NULL DEFAULT 0
    )
`);


module.exports = db;
