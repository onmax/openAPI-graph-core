import { RefNode } from './nodes/ref/RefNode';
import { SchemaNode } from './nodes/SchemaNode';

export class OpenAPIGraph {
    private schemaNodes!: SchemaNode[];
    private refNodes!: RefNode[];

    constructor() {
        this.schemaNodes = [];
        this.refNodes = [];
    }

    addSchemaNode(schemaNode: SchemaNode): void {
        // TODO Check that node is already in the graph and test it
        this.schemaNodes.push(schemaNode);
    }

    addSchemaNodes(schemaNodes: SchemaNode[]): void {
        schemaNodes.forEach(n => this.addSchemaNode(n));
    }

    getSchemaNodes(): SchemaNode[] {
        return this.schemaNodes;
    }

    addRefNode(refNode: RefNode): void {
        // TODO Check that node is already in the graph and test it
        this.refNodes.push(refNode);
    }

    addRefNodes(refNodes: RefNode[]): void {
        refNodes.forEach(n => this.addRefNode(n));
    }

    getRefNode(): RefNode[] {
        return this.refNodes;
    }
}

