import { OpenAPIV3 } from 'openapi-types';
import { EdgesRefDict, Nodes } from '../../../model';
import { SchemaNode } from "../../graph/nodes/SchemaNode";
import { RefEdge, SchemaRefEdge } from '../edges/ref';

/**
 * It will find all the schemas defined in the specification
 * 
 * @param api source 
 * @param fn callback which will be executed for every node
 */
export function getSchemaNodes(apiContent: OpenAPIV3.Document): Nodes["schemas"] {
    const nodes: Nodes["schemas"] = {};
    const schemas = apiContent?.components?.schemas
    if (schemas) {
        Object.keys(schemas).forEach(schema => {
            if ('$ref' !== schema) {
                nodes[schema] = new SchemaNode(schema, schemas[schema] as OpenAPIV3.SchemaObject)
            }
        });
    }
    return nodes;
}

/**
 * It will find all the references defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
const defaultEdgesRefDict: EdgesRefDict = { schemaRef: {} }
export function getRefEdges(json: any, edges: EdgesRefDict = defaultEdgesRefDict): EdgesRefDict {
    if (json['$ref']) {
        const ref: string = json['$ref'];
        // TODO Should test any type of component
        // TODO It should check that is after /#/
        if (/components\/schemas/.test(ref)) {
            edges.schemaRef[ref] = new SchemaRefEdge(ref)
        }
    } else {
        function handleJson(json: { [x: string]: any; }) {
            Object.keys(json).forEach(key => {
                edges = getRefEdges(json[key], edges)
            })
        }
        if (({}).constructor === json.constructor) {
            handleJson(json);
        } else if (([]).constructor === json.constructor) {
            json.forEach(handleJson);
        }
    }
    return edges;
}