import { RefNode } from './nodes/ref/RefNode';
import { SchemaNode } from './nodes/SchemaNode';

export class OpenAPIGraph {
    private schemaNodes!: Set<SchemaNode>;
    private refNodes!: Set<RefNode>;

    constructor() {
        this.schemaNodes = new Set();
        this.refNodes = new Set();
    }

    findSchemaNodeByName(schemaName: string): SchemaNode | undefined {
        return this.getSchemaNodes().find(s => s.name === schemaName);
    }

    addSchemaNode(schemaNode: SchemaNode): void {
        if (!this.findSchemaNodeByName(schemaNode.name)) {
            this.schemaNodes.add(schemaNode);
        }
    }

    addSchemaNodes(schemaNodes: SchemaNode[]): void {
        schemaNodes.forEach(n => this.addSchemaNode(n));
    }

    getSchemaNodes(): SchemaNode[] {
        return Array.from(this.schemaNodes);
    }

    findRefNodeByName(schemaName: string): RefNode | undefined {
        return this.getRefNode().find(s => s.name === schemaName);
    }

    addRefNode(refNode: RefNode): void {
        if (!this.findRefNodeByName(refNode.name)) {
            this.refNodes.add(refNode);
        }
    }

    addRefNodes(refNodes: RefNode[]): void {
        refNodes.forEach(n => this.addRefNode(n));
    }

    getRefNode(): RefNode[] {
        return Array.from(this.refNodes);
    }
}

