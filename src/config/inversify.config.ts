import { Container } from 'inversify';
import TYPES from './types';

import type { ICalculatorService } from '@/domain/services/ICalculatorService';
import { CalculatorService } from '@/domain/services/CalculatorService';

import { UseCasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';

const container = new Container();

container.bind<ICalculatorService>(TYPES.ICalculatorService).to(CalculatorService);

container.load(UseCasesProxyModule);

export { container };
