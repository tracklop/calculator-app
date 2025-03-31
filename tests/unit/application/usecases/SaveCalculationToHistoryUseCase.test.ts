import { SaveCalculationToHistoryUseCase } from '@/application/usecases/history/SaveCalculationToHistoryUseCase';
import { Calculation } from '@/domain/entities/Calculation';
import { CalculatorService } from '@/domain/services/CalculatorService';
import type { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';

const calculator = new CalculatorService();
const calc = new Calculation(1, 2, '+', calculator.calculate(1, 2, '+'));

const mockHistoryService: ICalculationHistoryService = {
    getAll: () => [],
    save: jest.fn(),
};

describe('SaveCalculationToHistoryUseCase', () => {
    it('should call save on history service', () => {
        const usecase = new SaveCalculationToHistoryUseCase(mockHistoryService);
        usecase.execute(calc);
        expect(mockHistoryService.save).toHaveBeenCalledWith(calc);
    });
});
