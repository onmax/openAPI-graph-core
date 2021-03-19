"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnusedSchemas = void 0;
const fetcher_1 = require("./fetcher");
const graph_1 = require("./graph");
async function getUnusedSchemas(path) {
    const apis = await fetcher_1.fetcher(path);
    const graph = new graph_1.OpenAPIGraphsManager(apis);
    return graph.checkForUnusedSchemas();
}
exports.getUnusedSchemas = getUnusedSchemas;
