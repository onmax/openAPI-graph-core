"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefNodes = exports.getSchemaNodes = void 0;
const SchemaRefNode_1 = require("../../graph/nodes/ref/SchemaRefNode");
const SchemaNode_1 = require("../../graph/nodes/SchemaNode");
/**
 * It will find all the schemas defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
function getSchemaNodes(apiContent) {
    const nodes = [];
    const schemas = apiContent?.components?.schemas;
    if (schemas) {
        Object.keys(schemas).forEach(schema => {
            if ('$ref' !== schema) {
                nodes.push(new SchemaNode_1.SchemaNode(schema, schemas[schema]));
            }
        });
    }
    return nodes;
}
exports.getSchemaNodes = getSchemaNodes;
/**
 * It will find all the references defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
function getRefNodes(json, nodes = []) {
    if (json['$ref']) {
        const ref = json['$ref'];
        // TODO Should test any type of component
        if (/components\/schemas/.test(ref)) {
            nodes.push(new SchemaRefNode_1.SchemaRefNode(ref));
        }
    }
    else {
        function handleJson(json) {
            Object.keys(json).forEach(key => {
                nodes = getRefNodes(json[key], nodes);
            });
        }
        if (({}).constructor === json.constructor) {
            handleJson(json);
        }
        else if (([]).constructor === json.constructor) {
            json.forEach(handleJson);
        }
    }
    return nodes;
}
exports.getRefNodes = getRefNodes;
