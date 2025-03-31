import express from 'express';
import calculationRoutes from '@/infrastructure/routes/calculation.routes';

const app = express();

app.use(express.json());
app.use('/api', calculationRoutes);

export default app;
