import { OpenAPIGraphsBuilder } from '.';
import { OpenAPIGraphLibConfigInterface, OpenAPIGraphsBuilderInterface, OpenAPIGraphsConstructor, OpenAPIGraphsInterface } from 'openapi-graph-types';
import { fetcher } from '../utils';
import { defaultOpenAPIGraphLibConfig, log, openAPIGraphLibConfig, setOpenAPIGraphLibConfig } from '../utils';

export const OpenAPIGraphs: OpenAPIGraphsConstructor = class OpenAPIGraphsImpl implements OpenAPIGraphsInterface {
  builder!: OpenAPIGraphsBuilderInterface;
  rootPath!: string;

  constructor(rootPath: string, options: OpenAPIGraphLibConfigInterface = defaultOpenAPIGraphLibConfig) {
    this.rootPath = rootPath;
    setOpenAPIGraphLibConfig({ ...openAPIGraphLibConfig, ...options })
  }

  async build() {
    const apis = await fetcher(this.rootPath);
    log(`Found ${apis.length} openAPI definitions`)
    this.builder = new OpenAPIGraphsBuilder(apis);
  }
};
