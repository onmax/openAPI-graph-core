import { EdgeConstructor, EdgeInterface, NodeInterface, RefType } from 'openapi-graph-types';
import { resolve } from 'path';

export const Edge: EdgeConstructor = class EdgeImpl implements EdgeInterface {
  parent: NodeInterface | undefined;
  child: NodeInterface | undefined;

  rawPath!: string;
  tokenName!: string;
  specificationPath!: string;
  filePath!: string;
  refToFilePath!: string;

  constructor(filePath: string, specificationPath: string) {
    // TODO: Check that inputs are valid
    this.filePath = filePath;
    this.rawPath = specificationPath;

    const cleanSpecificationPathParts = specificationPath?.split('#');
    if (cleanSpecificationPathParts.length < 2) {
      return;
    }
    this.specificationPath = cleanSpecificationPathParts[1];
    switch (this.type) {
      case RefType.Local:
      case RefType.URL:
        this.refToFilePath = resolve(`${filePath}/${cleanSpecificationPathParts[0]}`);
        break;
      case RefType.Remote:
        this.refToFilePath = resolve(`${filePath}/../${cleanSpecificationPathParts[0]}`);
        break;
    }
    const specificationPathParts = specificationPath.split('/');
    this.tokenName = specificationPathParts[specificationPathParts.length - 1];
  }

  get path(): string {
    return `${this.filePath}#${this.specificationPath}`;
  }

  // TODO Tests
  get type(): RefType | undefined {
    // Test if extension file is in the string
    if (/\.(yml|yaml|json)\/?#\//.test(this.rawPath)) {
      if (/^https?:\/\//.test(this.rawPath)) {
        return RefType.URL;
      } else {
        return RefType.Remote;
      }
    } else if (!/\.(yml|yaml|json)\/?#\//.test(this.rawPath)) {
      return RefType.Local;
    }
    return undefined;
  }
};
