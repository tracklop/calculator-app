import { injectable } from 'inversify';
import type { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';
import type { Calculation } from '@/domain/entities/Calculation';

@injectable()
export class CalculationHistoryService implements ICalculationHistoryService {
    private history: Calculation[] = [];

    save(calculation: Calculation): void {
        this.history.unshift(calculation);
    }

    getAll(): Calculation[] {
        return [...this.history];
    }
}
