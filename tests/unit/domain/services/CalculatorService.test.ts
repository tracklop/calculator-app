import { CalculatorService } from '@/domain/services/CalculatorService';

describe('CalculatorService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        service = new CalculatorService();
    });

    it('should add numbers', () => {
        expect(service.calculate(2, 3, '+')).toBe(5);
    });

    it('should subtract numbers', () => {
        expect(service.calculate(5, 2, '-')).toBe(3);
    });

    it('should multiply numbers', () => {
        expect(service.calculate(4, 2, '*')).toBe(8);
    });

    it('should divide numbers', () => {
        expect(service.calculate(10, 2, '/')).toBe(5);
    });

    it('should throw an error on division by zero', () => {
        expect(() => service.calculate(5, 0, '/')).toThrow('Division by zero is not allowed.');
    });

    it('should throw an error on invalid operator', () => {
        // @ts-expect-error intentional bad input
        expect(() => service.calculate(1, 1, '%')).toThrow('Invalid operator: %');
    });
});
