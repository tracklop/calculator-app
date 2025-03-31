import { injectable } from 'inversify';
import type { Operator } from '@/domain/entities/Calculation';
import type { ICalculatorService } from './ICalculatorService';

@injectable()
export class CalculatorService implements ICalculatorService {
    public calculate(operand1: number, operand2: number, operator: Operator): number {
        if (!['+', '-', '*', '/'].includes(operator)) {
            throw new Error(`Invalid operator: ${operator}`);
        }

        if (operator === '/' && operand2 === 0) {
            throw new Error('Division by zero is not allowed.');
        }

        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
        }
    }
}
