import { resolve } from 'path';
import { RefType } from '../../../model';
import { Edge } from './Edge';

export class RefEdge extends Edge {
  ref!: string;
  absolutePath!: string;
  tokenName!: string;
  type!: RefType;

  constructor(absolutePath: string, ref: string) {
    super();

    // Check that is valid ref and get its type
    const type = this.getType(ref);
    if (type === undefined) {
      return;
    }
    this.type = type;
    this.ref = ref;
    this.tokenName = this.getTokenName(ref);
    this.absolutePath = this.resolveAbsolutePath(absolutePath, ref);
  }

  // TODO Tests
  getType(ref: string): RefType | undefined {
    // Test if extension file is in the string
    if (/\.(yml|yaml|json)\/?#\//.test(ref)) {
      if (/^https?:\/\//.test(ref)) {
        return RefType.URL;
      } else {
        return RefType.Remote;
      }
    } else if (!/\.(yml|yaml|json)\/?#\//.test(ref)) {
      return RefType.Local;
    }
    return undefined;
  }

  // TODO Tests
  getTokenName(ref: string): string {
    const parts = ref.split('/');
    return parts[parts.length - 1];
  }

  // TODO Tests
  resolveAbsolutePath(absolutePath: string, ref: string): string {
    const filePath = ref.split('#')[0];
    return resolve(this.type === RefType.Remote ? `${absolutePath}/../${filePath}` : `${absolutePath}/${filePath}`);
  }

  // TODO Tests
  getFullPath() {
    return `${this.absolutePath}#${this.ref.split('#')[1]}`;
  }
}
