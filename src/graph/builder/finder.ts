import { OpenAPIV3 } from 'openapi-types';
import { RefNode } from "../../graph/nodes/ref/RefNode";
import { SchemaRefNode } from "../../graph/nodes/ref/SchemaRefNode";
import { SchemaNode } from "../../graph/nodes/SchemaNode";

/**
 * It will find all the schemas defined in the specification
 * 
 * @param api source 
 * @param fn callback which will be executed for every node
 */
export function getSchemaNodes(apiContent: OpenAPIV3.Document): SchemaNode[] {
    const nodes: SchemaNode[] = [];
    const schemas = apiContent?.components?.schemas
    if (schemas) {
        Object.keys(schemas).forEach(schema => {
            if ('$ref' !== schema) {
                nodes.push(new SchemaNode(schema, schemas[schema] as OpenAPIV3.SchemaObject))
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
export function getRefNodes(json: any, nodes: RefNode[] = []): RefNode[] {
    if (json['$ref']) {
        const ref: string = json['$ref'];
        // TODO Should test any type of component
        if (/components\/schemas/.test(ref)) {
            nodes.push(new SchemaRefNode(ref))
        }
    } else {
        function handleJson(json: { [x: string]: any; }) {
            Object.keys(json).forEach(key => {
                nodes = getRefNodes(json[key], nodes)
            })
        }
        if (({}).constructor === json.constructor) {
            handleJson(json);
        } else if (([]).constructor === json.constructor) {
            json.forEach(handleJson);
        }
    }
    return nodes;
}