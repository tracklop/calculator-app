import { HistoryController } from '@/infrastructure/controllers/HistoryController';
import { Calculation } from '@/domain/entities/Calculation';
import { CalculatorService } from '@/domain/services/CalculatorService';
import type { Request, Response } from 'express';

describe('HistoryController', () => {
    const calculator = new CalculatorService();
    const result = calculator.calculate(1, 2, '+');
    const calculation = new Calculation(1, 2, '+', result);
    const executeMock = jest.fn();

    const useCaseProxy = {
        getInstance: () => ({
            execute: executeMock,
        }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controller = new HistoryController(useCaseProxy as any, useCaseProxy as any);

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
        executeMock.mockReturnValue([calculation]);

        controller.getHistory({} as Request, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([calculation]);
    });

    it('should clone and recalculate a calculation', () => {
        const req = {
            body: { operand1: 2, operand2: 5, operator: '+' },
        } as Partial<Request>;

        const res = mockRes();
        executeMock.mockReturnValue(calculation);

        controller.cloneAndRecalculate(req as Request, res);

        expect(executeMock).toHaveBeenCalledWith(2, 5, '+');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(calculation);
    });

    it('should return 400 if input format is invalid', () => {
        const req = {
            body: { operand1: 'a', operand2: 2, operator: '+' },
        } as Partial<Request>;

        const res = mockRes();

        controller.cloneAndRecalculate(req as Request, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input format.' });
    });

    it('should return 400 if operator is invalid', () => {
        const req = {
            body: { operand1: 2, operand2: 3, operator: '%' },
        } as Partial<Request>;

        const res = mockRes();

        controller.cloneAndRecalculate(req as Request, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid operator.' });
    });

    it('should return 400 if usecase throws an error', () => {
        const req = {
            body: { operand1: 10, operand2: 0, operator: '/' },
        } as Partial<Request>;

        const res = mockRes();

        executeMock.mockImplementation(() => {
            throw new Error('Division by zero is not allowed.');
        });

        controller.cloneAndRecalculate(req as Request, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Division by zero is not allowed.' });
    });
});
