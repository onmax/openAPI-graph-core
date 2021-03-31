import { NodeConstructor, NodeInterface } from 'openapi-graph-types';

export const Node: NodeConstructor = class NodeImpl implements NodeInterface {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
};
