import { OpenAPIV3 } from 'openapi-types';
import { Node } from './Node';

export class SchemaNode extends Node {
    content!: OpenAPIV3.SchemaObject;

    constructor(name: string, content: OpenAPIV3.SchemaObject) {
        super(name);
        this.content = content;
    }
}
