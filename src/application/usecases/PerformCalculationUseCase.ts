import TYPES from '@/config/types';
import { Operator, Calculation } from '@/domain/entities/Calculation';
import { ICalculatorService } from '@/domain/services/ICalculatorService';
import { injectable, inject } from 'inversify';

@injectable()
export class PerformCalculationUseCase {
    constructor(
        @inject(TYPES.ICalculatorService)
        private readonly calculatorService: ICalculatorService,
    ) {}

    execute(operand1: number, operand2: number, operator: Operator): Calculation {
        const result = this.calculatorService.calculate(operand1, operand2, operator);
        return new Calculation(operand1, operand2, operator, result);
    }
}
