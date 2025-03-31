import { Container } from 'inversify';
import TYPES from './types';

import type { ICalculatorService } from '@/domain/services/ICalculatorService';
import { CalculatorService } from '@/domain/services/CalculatorService';
import { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';
import { CalculationHistoryService } from '@/infrastructure/services/CalculationHistoryService';

import { UseCasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';

const container = new Container();

container.bind<ICalculatorService>(TYPES.ICalculatorService).to(CalculatorService);
container.bind<ICalculationHistoryService>(TYPES.ICalculationHistoryService).to(CalculationHistoryService);

container.load(UseCasesProxyModule);

export { container };
