import { CalculationController } from '@/infrastructure/controllers/CalculationController';
import { Calculation } from '@/domain/entities/Calculation';
import { Request, Response } from 'express';

describe('CalculationController', () => {
    const executeMock = jest.fn();

    const useCaseProxy = {
        useCase: {},
        getInstance: () => ({
            execute: executeMock,
        }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controller = new CalculationController(useCaseProxy as any);

    const mockRes = (): Response => {
        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if input is invalid', () => {
        const req = {
            body: { operand1: 'a', operand2: 2, operator: '+' },
        } as Partial<Request>;

        const res = mockRes();

        controller.calculate(req as Request, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input format.' });
    });

    it('should return 200 with result if input is valid', () => {
        const req = {
            body: { operand1: 4, operand2: 2, operator: '*' },
        } as Partial<Request>;

        const res = mockRes();

        const calc = new Calculation(4, 2, '*', 8, new Date('2023-01-01'));
        executeMock.mockReturnValue(calc);

        controller.calculate(req as Request, res);
        expect(executeMock).toHaveBeenCalledWith(4, 2, '*');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(calc);
    });

    it('should return 400 if usecase throws', () => {
        const req = {
            body: { operand1: 4, operand2: 0, operator: '/' },
        } as Partial<Request>;

        const res = mockRes();

        executeMock.mockImplementation(() => {
            throw new Error('Division by zero is not allowed.');
        });

        controller.calculate(req as Request, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Division by zero is not allowed.' });
    });
});
