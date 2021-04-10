import { OpenAPIGraphsBuilder } from '.';
import { OpenAPIGraphsBuilderInterface, OpenAPIGraphsConstructor, OpenAPIGraphsInterface } from 'openapi-graph-types';
import { fetcher } from '../openapi/fetcher';
const logger = require('pino')({
  prettyPrint: {
    ignore: 'time,pid,hostname',
    singleLine: true
  }
})

export const OpenAPIGraphs: OpenAPIGraphsConstructor = class OpenAPIGraphsImpl implements OpenAPIGraphsInterface {
  builder!: OpenAPIGraphsBuilderInterface;
  rootPath!: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  async build() {
    const apis = await fetcher(this.rootPath);
    logger.info(`Found ${apis.length} openAPI definitions`)
    this.builder = new OpenAPIGraphsBuilder(apis);
  }
};
