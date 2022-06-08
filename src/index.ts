import express from 'express';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/loginControllers';
import './controllers/rootController';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({ keys: ['laskdjf'] }));

app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
