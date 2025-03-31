import { PerformCalculationUseCase } from '@/application/usecases/PerformCalculationUseCase';
import type { ICalculatorService } from '@/domain/services/ICalculatorService';
import { Calculation } from '@/domain/entities/Calculation';

describe('PerformCalculationUseCase', () => {
    const mockService: ICalculatorService = {
        calculate: jest.fn(),
    };

    it('should create a Calculation with the result from the service', () => {
        const operand1 = 4;
        const operand2 = 2;
        const operator = '*';
        const expectedResult = 8;

        jest.spyOn(mockService, 'calculate').mockReturnValue(expectedResult);

        const usecase = new PerformCalculationUseCase(mockService);
        const calc = usecase.execute(operand1, operand2, operator);

        expect(mockService.calculate).toHaveBeenCalledWith(operand1, operand2, operator);
        expect(calc).toBeInstanceOf(Calculation);
        expect(calc.result).toBe(expectedResult);
        expect(calc.operator).toBe(operator);
    });
});
