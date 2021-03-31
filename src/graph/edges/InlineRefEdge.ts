import { RefEdgeConstructor, RefEdgeInterface } from 'openapi-graph-types';
import { Edge } from '.';

export const RefEdge: RefEdgeConstructor = class RefEdgeImpl extends Edge implements RefEdgeInterface {
  constructor(absolutePath: string, ref: string) {
    super(absolutePath, ref);
  }
};
