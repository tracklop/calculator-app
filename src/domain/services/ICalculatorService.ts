import type { Operator } from '@/domain/entities/Calculation';

export interface ICalculatorService {
    calculate(operand1: number, operand2: number, operator: Operator): number;
}
