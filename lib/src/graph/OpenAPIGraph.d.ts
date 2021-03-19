import { RefNode } from './nodes/ref/RefNode';
import { SchemaNode } from './nodes/SchemaNode';
export declare class OpenAPIGraph {
    private schemaNodes;
    private refNodes;
    constructor();
    addSchemaNode(schemaNode: SchemaNode): void;
    addSchemaNodes(schemaNodes: SchemaNode[]): void;
    getSchemaNodes(): SchemaNode[];
    addRefNode(refNode: RefNode): void;
    addRefNodes(refNodes: RefNode[]): void;
    getRefNode(): RefNode[];
}
