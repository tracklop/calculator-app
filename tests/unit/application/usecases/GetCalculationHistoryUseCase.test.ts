import { GetCalculationHistoryUseCase } from '@/application/usecases/history/GetCalculationHistoryUseCase';
import { Calculation } from '@/domain/entities/Calculation';
import { CalculatorService } from '@/domain/services/CalculatorService';
import type { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';

const calculator = new CalculatorService();
const result = calculator.calculate(3, 3, '*');
const mockCalculation = new Calculation(3, 3, '*', result);

const mockHistoryService: ICalculationHistoryService = {
    getAll: jest.fn().mockReturnValue([mockCalculation]),
    save: () => {
        throw new Error('Not implemented');
    },
};

describe('GetCalculationHistoryUseCase', () => {
    it('should return all calculations from service', () => {
        const usecase = new GetCalculationHistoryUseCase(mockHistoryService);
        const result = usecase.execute();
        expect(result).toHaveLength(1);
        expect(mockHistoryService.getAll).toHaveBeenCalled();
    });
});
