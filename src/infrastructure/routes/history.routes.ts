import { Router } from 'express';
import { container } from '@/config/inversify.config';
import TYPES from '@/config/types';
import { HistoryController } from '@/infrastructure/controllers/HistoryController';

const router = Router();
const controller = new HistoryController(
    container.get(TYPES.GetCalculationHistoryUseCaseProxy),
    container.get(TYPES.CloneAndRecalculateUseCaseProxy),
);

router.get('/history', controller.getHistory);

router.post('/clone', (req, res) => {
    const controller = container.get<HistoryController>(HistoryController);
    controller.cloneAndRecalculate(req, res);
});

export default router;
