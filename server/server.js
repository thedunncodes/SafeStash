import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(express.static('public'));

const port = 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
