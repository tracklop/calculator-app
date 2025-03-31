import { CalculationHistoryService } from '@/infrastructure/services/CalculationHistoryService';
import { Calculation } from '@/domain/entities/Calculation';
import { CalculatorService } from '@/domain/services/CalculatorService';

describe('CalculationHistoryService', () => {
    let service: CalculationHistoryService;
    let calculator: CalculatorService;

    beforeEach(() => {
        service = new CalculationHistoryService();
        calculator = new CalculatorService();
    });

    it('should save and retrieve calculations in reverse order', () => {
        const result1 = calculator.calculate(1, 1, '+');
        const result2 = calculator.calculate(2, 2, '*');
        const calc1 = new Calculation(1, 1, '+', result1);
        const calc2 = new Calculation(2, 2, '*', result2);

        service.save(calc1);
        service.save(calc2);

        const history = service.getAll();
        expect(history).toHaveLength(2);
        expect(history[0]).toEqual(calc2);
        expect(history[1]).toEqual(calc1);
    });
});
