import { resolve as resolveTs, getFormat, transformSource, load } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';

export { getFormat, transformSource, load };

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export async function resolve(specifier, context, defaultResolve) {
    const mapped = matchPath(specifier);
    if (mapped) {
        specifier = `${mapped}.js`;
    }

    return resolveTs(specifier, context, defaultResolve);
}
