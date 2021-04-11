import { OpenAPIGraphLibConfigInterface } from 'openapi-graph-types';
export * from './fetcher'
export * from './logger';

export const defaultOpenAPIGraphLibConfig: OpenAPIGraphLibConfigInterface = {
    verbose: false,
    debug: false
}

export let openAPIGraphLibConfig: OpenAPIGraphLibConfigInterface = { ...defaultOpenAPIGraphLibConfig }

export function setOpenAPIGraphLibConfig(newValues: OpenAPIGraphLibConfigInterface) {
    openAPIGraphLibConfig = newValues;
    if (openAPIGraphLibConfig.debug && !openAPIGraphLibConfig.verbose) {
        openAPIGraphLibConfig.verbose = true;
    }
}