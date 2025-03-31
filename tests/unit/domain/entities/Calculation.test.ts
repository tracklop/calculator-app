import { Calculation } from '@/domain/entities/Calculation';

describe('Calculation', () => {
    it('should instantiate correctly and keep provided values', () => {
        const calc = new Calculation(4, 2, '*', 8);
        expect(calc.operand1).toBe(4);
        expect(calc.operand2).toBe(2);
        expect(calc.operator).toBe('*');
        expect(calc.result).toBe(8);
        expect(calc.timestamp).toBeInstanceOf(Date);
    });

    it('should keep provided timestamp', () => {
        const timestamp = new Date('2024-01-01');
        const calc = new Calculation(1, 2, '+', 3, timestamp);
        expect(calc.timestamp).toBe(timestamp);
    });

    it('should format toString correctly', () => {
        const calc = new Calculation(5, 3, '-', 2);
        expect(calc.toString()).toBe('5 - 3 = 2');
    });
});
