import { Router } from 'express';
import { container } from '@/config/inversify.config';
import TYPES from '@/config/types';
import { HistoryController } from '@/infrastructure/controllers/HistoryController';

const router = Router();
const controller = new HistoryController(container.get(TYPES.GetCalculationHistoryUseCaseProxy));

router.get('/history', controller.getHistory);

export default router;
