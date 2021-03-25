import { OpenAPIV3 } from 'openapi-types';
import { Nodes, EdgesRefDict, OpenAPIGraphInterface, SchemaNodeInterface, } from 'openapi-graph-types';
import { SchemaNode } from '../../graph/nodes/SchemaNode';
import { RefEdge } from '../edges';

/**
 * Creates a new Schema depends on its type. Swagger schemas can be Array or NonArray
 * 
 * @param schema source
 * @param name The given name for the schema
 * @returns the new schema instance
 */
function createSchema(schemaNodes: { [key: string]: SchemaNodeInterface }, schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject, schemaName: string) {
  if (schema && !('$ref' in schema)) {
    if ('type' in schema && schema?.type === 'array') {
      schemaNodes[schemaName] = new SchemaNode(schemaName, schema)
    } else {
      schemaNodes[schemaName] = new SchemaNode(schemaName, schema)
    }
  }
}

export function getDefinedSchemasNodes(api: OpenAPIV3.Document): { [key: string]: SchemaNodeInterface } {
  const nodes: { [key: string]: SchemaNodeInterface } = {}
  const schemas: { [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject } | undefined = api.components?.schemas;
  if (schemas) {
    Object.keys(schemas).forEach(schemaName => createSchema(nodes, schemas[schemaName], schemaName));
  }
  return nodes;
}

/**
 * It will find all the schemas defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
export function getInlineSchemasNodes(json: any, currentIndex = 1, nodes: { [key: string]: SchemaNodeInterface } = {}): { [key: string]: SchemaNodeInterface } {
  const schema: OpenAPIV3.SchemaObject | undefined = json?.['schema'];
  if (schema) {
    createSchema(nodes, schema, `inline-schema-${currentIndex++}`)
    if (schema?.type === 'array') {
      getInlineSchemasNodes(json['items'], currentIndex, nodes)
    }
  } else if (json) {
    function handleJson() {
      Object.keys(json).forEach((key) => {
        nodes = getInlineSchemasNodes(json[key], currentIndex, nodes);
      });
    }
    if ({}.constructor === json.constructor) {
      handleJson();
    } else if ([].constructor === json.constructor) {
      json.forEach(handleJson);
    }
  }
  return nodes;
}

export function getSchemaNodes(api: OpenAPIV3.Document): Nodes['schemas'] {
  return { ...getDefinedSchemasNodes(api), ...getInlineSchemasNodes(api) }
}

/**
 * It will find all the references defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
export function getRefEdges(json: any, absolutePath: string, edges: EdgesRefDict = { schemaRef: {} }): EdgesRefDict {
  const ref: string | undefined = json?.['$ref'];
  if (ref) {
    // TODO Should test any type of component
    if (/components\/schemas/.test(ref)) {
      edges.schemaRef[ref] = new RefEdge(absolutePath, ref);
    }
  } else {
    function handleJson() {
      Object.keys(json).forEach((key) => {
        edges = getRefEdges(json[key], absolutePath, edges);
      });
    }
    if ({}.constructor === json.constructor) {
      handleJson();
    } else if ([].constructor === json.constructor) {
      json.forEach(handleJson);
    }
  }
  return edges;
}

export function resolveReference(graphs: OpenAPIGraphInterface[], refs: EdgesRefDict): EdgesRefDict {
  const filteredRefs: EdgesRefDict = {
    schemaRef: {},
  };

  Object.values(refs.schemaRef)
    .map((r) => ({ r, g: graphs.find((g) => g.path === r.absolutePath) }))
    .filter((o) => o.g?.nodes.schemas[o.r.tokenName])
    .forEach((o) => {
      o.r.child = o.g?.nodes.schemas[o.r.tokenName];
      filteredRefs.schemaRef[o.r.getFullPath()] = o.r;
    });

  return filteredRefs;
}
