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

// ✅ Résolution du __dirname en mode ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Express app
const app = express();
const port = ENV.PORT;

// ✅ Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Vues EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'interface/web/views'));

// ✅ Contenus statiques
app.use(express.static(path.resolve(__dirname, 'interface/web/public')));

// ✅ Routes API
app.use('/calculate', calculationRoutes);
app.use('/history', historyRoutes);

// ✅ Page principale
app.get('/', (_req, res) => {
    res.render('pages/index');
});

// ✅ Démarrage
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
