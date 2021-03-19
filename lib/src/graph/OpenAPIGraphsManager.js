"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPIGraphsManager = void 0;
const OpenAPIGraphsBuilder_1 = require("./OpenAPIGraphsBuilder");
const SchemaRefNode_1 = require("./nodes/ref/SchemaRefNode");
class OpenAPIGraphsManager {
    constructor(apis) {
        this.builder = new OpenAPIGraphsBuilder_1.OpenAPIGraphsBuilder(apis);
    }
    checkForUnusedSchemas() {
        let unusedSchemas = [];
        this.builder.graphs.forEach(graph => {
            const graphContent = graph.content;
            const refSchemaNames = graphContent.getRefNode().filter(ref => ref instanceof SchemaRefNode_1.SchemaRefNode).map(ref => ref.name);
            unusedSchemas = [...unusedSchemas, ...graphContent.getSchemaNodes().filter(schema => !refSchemaNames.includes(schema.name))];
        });
        return unusedSchemas;
    }
}
exports.OpenAPIGraphsManager = OpenAPIGraphsManager;
