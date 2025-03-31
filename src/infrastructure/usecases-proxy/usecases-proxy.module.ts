import { ContainerModule, interfaces } from 'inversify';
import TYPES from '@/config/types';
import { UseCaseProxy } from './usecases-proxy';

// ...

const UseCasesProxyModule = new ContainerModule((bind: interfaces.Bind) => {
    // ...
});

export { UseCasesProxyModule };
