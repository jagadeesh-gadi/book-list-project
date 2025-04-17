// db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'book_review_db'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

export default connection;
