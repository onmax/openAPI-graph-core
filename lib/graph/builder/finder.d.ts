import { OpenAPIV3 } from 'openapi-types';
import { RefNode } from "../../graph/nodes/ref/RefNode";
import { SchemaNode } from "../../graph/nodes/SchemaNode";
/**
 * It will find all the schemas defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
export declare function getSchemaNodes(apiContent: OpenAPIV3.Document): SchemaNode[];
/**
 * It will find all the references defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
export declare function getRefNodes(json: any, nodes?: RefNode[]): RefNode[];
