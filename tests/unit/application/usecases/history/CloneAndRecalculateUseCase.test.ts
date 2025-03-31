import { CloneAndRecalculateUseCase } from '@/application/usecases/history/CloneAndRecalculateUseCase';
import { CalculatorService } from '@/domain/services/CalculatorService';
import { Calculation } from '@/domain/entities/Calculation';
import type { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';

describe('CloneAndRecalculateUseCase', () => {
    const calculatorService = new CalculatorService();
    const saveMock = jest.fn();
    const mockHistoryService: ICalculationHistoryService = {
        getAll: () => [],
        save: saveMock,
    };

    it('should recalculate and save a new calculation', () => {
        const usecase = new CloneAndRecalculateUseCase(calculatorService, mockHistoryService);
        const result = usecase.execute(2, 3, '*');

        expect(result).toBeInstanceOf(Calculation);
        expect(result.result).toBe(6);
        expect(saveMock).toHaveBeenCalledWith(result);
    });
});
