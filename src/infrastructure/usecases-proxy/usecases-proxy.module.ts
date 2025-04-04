import { ContainerModule, interfaces } from 'inversify';
import TYPES from '@/config/types';
import { UseCaseProxy } from './usecases-proxy';

import { PerformCalculationUseCase } from '@/application/usecases/PerformCalculationUseCase';
import { GetCalculationHistoryUseCase } from '@/application/usecases/history/GetCalculationHistoryUseCase';
import { SaveCalculationToHistoryUseCase } from '@/application/usecases/history/SaveCalculationToHistoryUseCase';
import { CloneAndRecalculateUseCase } from '@/application/usecases/history/CloneAndRecalculateUseCase';

import { ICalculatorService } from '@/domain/services/ICalculatorService';
import { ICalculationHistoryService } from '@/domain/services/ICalculationHistoryService';

const UseCasesProxyModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UseCaseProxy<PerformCalculationUseCase>>(TYPES.PerformCalculationUseCaseProxy).toDynamicValue(
        (context: interfaces.Context) => {
            const calculatorService = context.container.get<ICalculatorService>(TYPES.ICalculatorService);
            const useCase = new PerformCalculationUseCase(calculatorService);
            return new UseCaseProxy(useCase);
        },
    );

    bind<UseCaseProxy<GetCalculationHistoryUseCase>>(TYPES.GetCalculationHistoryUseCaseProxy).toDynamicValue(
        (context) => {
            const historyService = context.container.get<ICalculationHistoryService>(TYPES.ICalculationHistoryService);
            return new UseCaseProxy(new GetCalculationHistoryUseCase(historyService));
        },
    );

    bind<UseCaseProxy<SaveCalculationToHistoryUseCase>>(TYPES.SaveCalculationToHistoryUseCaseProxy).toDynamicValue(
        (context) =>
            new UseCaseProxy(
                new SaveCalculationToHistoryUseCase(
                    context.container.get<ICalculationHistoryService>(TYPES.ICalculationHistoryService),
                ),
            ),
    );

    bind<UseCaseProxy<CloneAndRecalculateUseCase>>(TYPES.CloneAndRecalculateUseCaseProxy).toDynamicValue((context) => {
        const calculatorService = context.container.get<ICalculatorService>(TYPES.ICalculatorService);
        const historyService = context.container.get<ICalculationHistoryService>(TYPES.ICalculationHistoryService);
        const usecase = new CloneAndRecalculateUseCase(calculatorService, historyService);
        return new UseCaseProxy(usecase);
    });
});

export { UseCasesProxyModule };
