import 'dotenv/config';
import { ENV } from '@/config/env';
import express, { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

import '@/config/inversify.config';

import routes from '@/infrastructure/routes/index.routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = ENV.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'interface/web/views'));

app.use(express.static(path.resolve(__dirname, 'interface/web/public')));

routes.forEach((router: Router & { routerName?: string }) => {
    app.use(router);
    let routesLog = '';
    router.stack.forEach((layer) => {
        if (layer.route) {
            routesLog += `  - ${layer.route.path}\n`;
        }
    });
    console.log(`Routes montées depuis ${router.routerName || 'un fichier'}\n${routesLog}`);
});

app.get('/', (_req, res) => {
    res.render('pages/index');
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
