// server/index.js
import express from 'express';
import cors from 'cors';
import reviews from './routes/reviews.js';
import users from './routes/users.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/reviews', reviews);
// app.get('/reviews', (req, res) => {
//     res.json(reviews);  // Send reviews as JSON response
//   });
app.use('/users', users); // Add this line

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
