import { inject, injectable } from 'inversify';
import { Calculation } from '@/domain/entities/Calculation';
import type { Operator } from '@/domain/entities/Calculation';
import type { ICalculatorService } from '@/domain/services/ICalculatorService';
import type { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';
import TYPES from '@/config/types';

@injectable()
export class CloneAndRecalculateUseCase {
    constructor(
        @inject(TYPES.ICalculatorService)
        private readonly calculatorService: ICalculatorService,

        @inject(TYPES.ICalculationHistoryService)
        private readonly historyService: ICalculationHistoryService,
    ) {}

    execute(operand1: number, operand2: number, operator: Operator): Calculation {
        const result = this.calculatorService.calculate(operand1, operand2, operator);
        const newCalculation = new Calculation(operand1, operand2, operator, result);
        this.historyService.save(newCalculation);
        return newCalculation;
    }
}
