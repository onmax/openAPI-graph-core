import { RefNode } from './RefNode';

export class SchemaRefNode extends RefNode {
    constructor(ref: string) {
        const splits = ref.split('/')
        super(splits[splits.length - 1], ref);
    }
}
