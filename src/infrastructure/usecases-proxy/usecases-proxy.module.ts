import { ContainerModule, interfaces } from 'inversify';
import TYPES from '@/config/types';
import { UseCaseProxy } from './usecases-proxy';

import { PerformCalculationUseCase } from '@/application/usecases/PerformCalculationUseCase';
import { ICalculatorService } from '@/domain/services/ICalculatorService';

// ...

const UseCasesProxyModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UseCaseProxy<PerformCalculationUseCase>>(TYPES.PerformCalculationUseCaseProxy).toDynamicValue(
        (context: interfaces.Context) => {
            const calculatorService = context.container.get<ICalculatorService>(TYPES.ICalculatorService);
            const useCase = new PerformCalculationUseCase(calculatorService);
            return new UseCaseProxy(useCase);
        },
    );
});

export { UseCasesProxyModule };
