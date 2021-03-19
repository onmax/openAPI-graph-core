"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPIGraphsBuilder = void 0;
const builder_1 = require("./builder");
const OpenAPIGraph_1 = require("./OpenAPIGraph");
class OpenAPIGraphsBuilder {
    constructor(apis) {
        this.graphs = this.initializeGraph(apis);
    }
    initializeGraph(apis) {
        const graphs = [];
        apis.forEach(api => {
            const graph = new OpenAPIGraph_1.OpenAPIGraph();
            graph.addSchemaNodes(this.getSchemaNodes(api));
            graph.addRefNodes(this.getRefNodes(api));
            graphs.push({ name: api.content.info.title, content: graph });
        });
        return graphs;
    }
    getSchemaNodes(api) {
        return builder_1.getSchemaNodes(api.content);
    }
    getRefNodes(api) {
        return builder_1.getRefNodes(api.content);
    }
}
exports.OpenAPIGraphsBuilder = OpenAPIGraphsBuilder;
