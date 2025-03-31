import { Request, Response } from 'express';
import type { UseCaseProxy } from '@/infrastructure/usecases-proxy/usecases-proxy';
import type { GetCalculationHistoryUseCase } from '@/application/usecases/history/GetCalculationHistoryUseCase';

export class HistoryController {
    constructor(private readonly getHistoryUseCaseProxy: UseCaseProxy<GetCalculationHistoryUseCase>) {}

    getHistory = (_req: Request, res: Response): void => {
        try {
            const result = this.getHistoryUseCaseProxy.getInstance().execute();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Unable to retrieve history.' });
        }
    };
}
