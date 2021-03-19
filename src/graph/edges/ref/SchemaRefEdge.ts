import { Node } from '../../nodes/Node';
import { RefEdge } from './RefEdge';

export class SchemaRefEdge extends RefEdge {
    constructor(ref: string) {
        super(ref);
    }
}
