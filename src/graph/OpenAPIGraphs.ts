import { OpenAPIGraphsBuilder } from '.';
import { OpenAPIGraphsBuilderInterface, OpenAPIGraphsConstructor, OpenAPIGraphsInterface } from 'openapi-graph-types';
import { fetcher } from '../openapi/fetcher';

export const OpenAPIGraphs: OpenAPIGraphsConstructor = class OpenAPIGraphsImpl implements OpenAPIGraphsInterface {
  builder!: OpenAPIGraphsBuilderInterface;
  rootPath!: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  async build() {
    const apis = await fetcher(this.rootPath);
    this.builder = new OpenAPIGraphsBuilder(apis);
  }
};
