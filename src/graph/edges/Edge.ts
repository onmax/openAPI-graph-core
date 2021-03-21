import { EdgeConstructor, EdgeInterface, NodeInterface } from 'openapi-graph-types';

export const Edge: EdgeConstructor = class EdgeImpl implements EdgeInterface {
  parent: NodeInterface | undefined;
  child: NodeInterface | undefined;
}
