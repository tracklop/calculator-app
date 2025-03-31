import { Calculation } from '@/domain/entities/Calculation';

describe('Calculation Entity', () => {
    it('should correctly add two numbers', () => {
        const calc = new Calculation(2, 3, '+');
        expect(calc.result).toBe(5);
    });

    it('should correctly subtract two numbers', () => {
        const calc = new Calculation(5, 3, '-');
        expect(calc.result).toBe(2);
    });

    it('should correctly multiply two numbers', () => {
        const calc = new Calculation(2, 4, '*');
        expect(calc.result).toBe(8);
    });

    it('should correctly divide two numbers', () => {
        const calc = new Calculation(10, 2, '/');
        expect(calc.result).toBe(5);
    });

    it('should throw an error for division by zero', () => {
        expect(() => new Calculation(10, 0, '/')).toThrow('Division by zero is not allowed.');
    });

    it('should throw an error for invalid operator', () => {
        // @ts-expect-error intentional bad input
        expect(() => new Calculation(1, 2, '%')).toThrow('Invalid operator: %');
    });

    it('should generate a timestamp if not provided', () => {
        const calc = new Calculation(1, 1, '+');
        expect(calc.timestamp).toBeInstanceOf(Date);
    });

    it('should use provided timestamp', () => {
        const date = new Date('2024-01-01');
        const calc = new Calculation(1, 1, '+', date);
        expect(calc.timestamp).toBe(date);
    });

    it('should return correct string output', () => {
        const calc = new Calculation(2, 2, '*');
        expect(calc.toString()).toBe('2 * 2 = 4');
    });
});
