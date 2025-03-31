import { HistoryController } from '@/infrastructure/controllers/HistoryController';
import { Calculation } from '@/domain/entities/Calculation';
import { CalculatorService } from '@/domain/services/CalculatorService';
import type { Request, Response } from 'express';

describe('HistoryController', () => {
    const calculator = new CalculatorService();
    const result = calculator.calculate(1, 2, '+');
    const calculation = new Calculation(1, 2, '+', result);
    const executeMock = jest.fn().mockReturnValue([calculation]);

    const useCaseProxy = {
        getInstance: () => ({
            execute: executeMock,
        }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controller = new HistoryController(useCaseProxy as any);

    const mockRes = (): Response => {
        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return history with status 200', () => {
        const res = mockRes();
        controller.getHistory({} as Request, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([calculation]);
    });
});
