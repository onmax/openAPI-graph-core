import { Node } from '../../nodes/Node';
import { Edge } from '../Edge';

export class RefEdge extends Edge {
    ref!: string
    name!: string;
    constructor(ref: string) {
        super();
        this.ref = ref;
        const parts = this.ref.split('/')
        this.name = parts[parts.length - 1];
    }
}
