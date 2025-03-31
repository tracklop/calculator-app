import { Container } from 'inversify';
import { TYPES } from './types';

// ...

import { UseCasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';

// ...

const container = new Container();

container.load(UseCasesProxyModule);

export { container };
