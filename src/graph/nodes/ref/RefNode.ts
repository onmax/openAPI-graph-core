import { Node } from '../Node';

export class RefNode extends Node {
    ref: string;

    constructor(name: string, ref: string) {
        super(name);
        this.ref = ref;
    }
}
