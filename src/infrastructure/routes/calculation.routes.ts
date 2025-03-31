import express from 'express';
import { CalculationController } from '@/infrastructure/controllers/CalculationController';
import { container } from '@/config/inversify.config';
import TYPES from '@/config/types';
import type { PerformCalculationUseCase } from '@/application/usecases/PerformCalculationUseCase';
import type { UseCaseProxy } from '@/infrastructure/usecases-proxy/usecases-proxy';

const router = express.Router();

const performCalculationUseCaseProxy = container.get<UseCaseProxy<PerformCalculationUseCase>>(
    TYPES.PerformCalculationUseCaseProxy,
);

const controller = new CalculationController(performCalculationUseCaseProxy);

router.post('/calculate', controller.calculate);

export default router;
