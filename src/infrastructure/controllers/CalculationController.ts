import type { Request, Response } from 'express';
import type { UseCaseProxy } from '@/infrastructure/usecases-proxy/usecases-proxy';
import type { PerformCalculationUseCase } from '@/application/usecases/PerformCalculationUseCase';
import type { SaveCalculationToHistoryUseCase } from '@/application/usecases/history/SaveCalculationToHistoryUseCase';
import { Calculation } from '@/domain/entities/Calculation';

export class CalculationController {
    constructor(
        private readonly performCalculationUseCaseProxy: UseCaseProxy<PerformCalculationUseCase>,
        private readonly saveCalculationUseCaseProxy: UseCaseProxy<SaveCalculationToHistoryUseCase>,
    ) {}

    public calculate = (req: Request, res: Response): void => {
        const { operand1, operand2, operator } = req.body;

        if (typeof operand1 !== 'number' || typeof operand2 !== 'number' || !['+', '-', '*', '/'].includes(operator)) {
            res.status(400).json({ error: 'Invalid input format.' });
            return;
        }

        try {
            const performUseCase = this.performCalculationUseCaseProxy.getInstance();
            const result: Calculation = performUseCase.execute(operand1, operand2, operator);

            const saveUseCase = this.saveCalculationUseCaseProxy.getInstance();
            saveUseCase.execute(result);

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };
}
