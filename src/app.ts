import 'dotenv/config';
import { ENV } from '@/config/env';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

import '@/config/inversify.config';

import calculationRoutes from '@/infrastructure/routes/calculation.routes';
import historyRoutes from '@/infrastructure/routes/history.routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = ENV.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'interface/web/views'));

app.use(express.static(path.resolve(__dirname, 'interface/web/public')));

app.use('/', calculationRoutes, historyRoutes);

app.get('/', (_req, res) => {
    res.render('pages/index');
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
