import 'reflect-metadata';
import express, { type Request, type Response } from 'express';
import calculationRoutes from '@/infrastructure/routes/calculation.routes';
import { ENV } from '@/config/env';

const app = express();
const port = ENV.PORT;

app.use(express.json());

app.use('/api', calculationRoutes);

app.get('/', (_req: Request, res: Response) => {
    res.send('🧠 Calculator API is running!');
});

app.listen(port, () => {
    console.log(`🚀 Server is listening on http://localhost:${port}`);
});
