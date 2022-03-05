import express from 'express';
import { sessionRouter } from './routes/sessionRouter';
import { userRouter } from './routes/userRouter';

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(sessionRouter);
app.get('/', function (req, res) {
  res.send('Server up and running');
});

app.use(express.json());

export { app };
