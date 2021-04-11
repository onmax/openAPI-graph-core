import { EdgesRefDict, LogLevel, Nodes, OpenAPIGraphsBuilderInterface, SchemaNodeInterface } from 'openapi-graph-types';
import { OpenAPIV3 } from 'openapi-types';
import { SchemaNode } from '../../graph/nodes/SchemaNode';
import { log } from '../../utils';
import { RefEdge } from '../edges';

/**
 * Creates a new Schema depends on its type. Swagger schemas can be Array or NonArray
 *
 * @param schema source
 * @param name The given name for the schema
 * @returns the new schema instance
 */
function createSchema(
  schemaNodes: { [key: string]: SchemaNodeInterface },
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  schemaName: string,
  isInline: boolean,
) {
  if (schema && !('$ref' in schema)) {
    if ('type' in schema && schema?.type === 'array') {
      schemaNodes[schemaName] = new SchemaNode(schemaName, schema, isInline);
    } else {
      schemaNodes[schemaName] = new SchemaNode(schemaName, schema, isInline);
    }
  }
}

export function getDefinedSchemasNodes(api: OpenAPIV3.Document): { [key: string]: SchemaNodeInterface } {
  const nodes: { [key: string]: SchemaNodeInterface } = {};
  const schemas: { [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject } | undefined =
    api.components?.schemas;
  if (schemas) {
    Object.keys(schemas).forEach((schemaName) => createSchema(nodes, schemas[schemaName], schemaName, false));
  }
  return nodes;
}

/**
 * It will find all the schemas defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
export function getInlineSchemasNodes(
  json: any,
  currentIndex = 1,
  nodes: { [key: string]: SchemaNodeInterface } = {},
): { [key: string]: SchemaNodeInterface } {
  const schema: OpenAPIV3.SchemaObject | undefined = json?.schema;
  if (schema) {
    createSchema(nodes, schema, `inline-schema-${currentIndex++}`, true);
    if (schema?.type === 'array') {
      getInlineSchemasNodes(json.items, currentIndex, nodes);
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
  const schemas = getDefinedSchemasNodes(api)
  const inlineSchemas = getInlineSchemasNodes(api)
  log(`Found ${Object.values(schemas).length} schemas and ${Object.values(inlineSchemas).length} inline schemas in ${api.info.title}`, LogLevel.DEBUG)
  return { ...schemas, ...inlineSchemas };
}

/**
 * It will find all the references defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
export function getRefEdges(json: any, absolutePath: string, edges: EdgesRefDict = { schemaRef: {} }): EdgesRefDict {
  const ref: string | undefined = json?.$ref;
  if (ref) {
    // TODO Should test any type of component
    if (/components\/schemas/.test(ref)) {
      edges.schemaRef[ref] = new RefEdge(absolutePath, ref);
    }
  } else if (json !== null) {
    function handleJson() {
      Object.keys(json).forEach((key) => {
        getRefEdges(json[key], absolutePath, edges);
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

/**
 * Sets the edges' child value
 * @param graphs
 * @param refs
 * @returns
 */
export function resolveReference(graphs: OpenAPIGraphsBuilderInterface['graphs'], refs: EdgesRefDict): EdgesRefDict {
  const filteredRefs: EdgesRefDict = {
    schemaRef: {},
  };

  Object.values(refs.schemaRef)
    .filter((r) => graphs?.[r.refToFilePath] && graphs?.[r.refToFilePath].nodes.schemas[r.tokenName])
    .forEach((r) => {
      const schema = graphs?.[r.refToFilePath].nodes.schemas[r.tokenName];
      if (schema) {
        schema.referencedBy[r.path] = r;
        r.child = schema;
        filteredRefs.schemaRef[r.path] = r;
      }
    });

  return filteredRefs;
}
