import { injectable, inject } from 'inversify';
import type { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';
import type { Calculation } from '@/domain/entities/Calculation';
import TYPES from '@/config/types';

@injectable()
export class SaveCalculationToHistoryUseCase {
    constructor(
        @inject(TYPES.ICalculationHistoryService)
        private readonly historyService: ICalculationHistoryService,
    ) {}

    execute(calculation: Calculation): void {
        this.historyService.save(calculation);
    }
}
