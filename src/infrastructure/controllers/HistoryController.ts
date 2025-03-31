import { Request, Response } from 'express';
import type { UseCaseProxy } from '@/infrastructure/usecases-proxy/usecases-proxy';
import type { GetCalculationHistoryUseCase } from '@/application/usecases/history/GetCalculationHistoryUseCase';
import type { CloneAndRecalculateUseCase } from '@/application/usecases/history/CloneAndRecalculateUseCase';
import type { Operator } from '@/domain/entities/Calculation';

export class HistoryController {
    constructor(
        private readonly getHistoryUseCaseProxy: UseCaseProxy<GetCalculationHistoryUseCase>,
        private readonly cloneUseCase: UseCaseProxy<CloneAndRecalculateUseCase>,
    ) {}

    getHistory = (_req: Request, res: Response): void => {
        try {
            const result = this.getHistoryUseCaseProxy.getInstance().execute();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Unable to retrieve history.' });
        }
    };

    cloneAndRecalculate(req: Request, res: Response): void {
        try {
            const { operand1, operand2, operator } = req.body;

            if (typeof operand1 !== 'number' || typeof operand2 !== 'number' || typeof operator !== 'string') {
                res.status(400).json({ error: 'Invalid input format.' });
                return;
            }

            const typedOperator = operator as Operator;

            if (!['+', '-', '*', '/'].includes(typedOperator)) {
                res.status(400).json({ error: 'Invalid operator.' });
                return;
            }

            const newCalculation = this.cloneUseCase.getInstance().execute(operand1, operand2, typedOperator);
            res.status(201).json(newCalculation);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}
