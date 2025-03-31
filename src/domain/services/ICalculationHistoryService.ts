import { Calculation } from '@/domain/entities/Calculation';

export interface ICalculationHistoryService {
    save(calculation: Calculation): void;
    getAll(): Calculation[];
}
