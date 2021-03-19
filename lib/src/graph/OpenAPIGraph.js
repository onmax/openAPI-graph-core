"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPIGraph = void 0;
class OpenAPIGraph {
    constructor() {
        this.schemaNodes = [];
        this.refNodes = [];
    }
    addSchemaNode(schemaNode) {
        // TODO Check that node is already in the graph and test it
        this.schemaNodes.push(schemaNode);
    }
    addSchemaNodes(schemaNodes) {
        schemaNodes.forEach(n => this.addSchemaNode(n));
    }
    getSchemaNodes() {
        return this.schemaNodes;
    }
    addRefNode(refNode) {
        // TODO Check that node is already in the graph and test it
        this.refNodes.push(refNode);
    }
    addRefNodes(refNodes) {
        refNodes.forEach(n => this.addRefNode(n));
    }
    getRefNode() {
        return this.refNodes;
    }
}
exports.OpenAPIGraph = OpenAPIGraph;
