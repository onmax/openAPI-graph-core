import { RefEdgeConstructor, RefEdgeInterface, RefType } from 'openapi-graph-types';
import { Edge } from '.';

export const RefEdge: RefEdgeConstructor = class RefEdgeImpl extends Edge implements RefEdgeInterface {
  constructor(filePath: string, ref: string) {
    super(filePath, ref);
  }
};
