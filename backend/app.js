import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import cors from 'cors'
import path from 'path';
import bodyParser from 'body-parser';
import userRouter from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRoutes.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: 'http://localhost:8080', // Permitir apenas este domínio
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); 
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`App running in : http://localhost:3000/`);
  console.log(`CTRL + C to cancel`);
})