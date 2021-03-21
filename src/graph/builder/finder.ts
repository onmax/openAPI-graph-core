import { OpenAPIV3 } from 'openapi-types';
import { EdgesRefDict, Nodes, OpenAPIGraphInterface } from 'openapi-graph-types';
import { SchemaNode } from '../../graph/nodes/SchemaNode';
import { RefEdge } from '../edges';

/**
 * It will find all the schemas defined in the specification
 *
 * @param api source
 * @param fn callback which will be executed for every node
 */
export function getSchemaNodes(apiContent: OpenAPIV3.Document): Nodes['schemas'] {
  const nodes: Nodes['schemas'] = {};
  const schemas = apiContent?.components?.schemas;
  if (schemas) {
    Object.keys(schemas).forEach((schema) => {
      if ('$ref' !== schema) {
        nodes[schema] = new SchemaNode(schema, schemas[schema] as OpenAPIV3.SchemaObject);
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
export function getRefEdges(json: any, absolutePath: string, edges: EdgesRefDict = { schemaRef: {} }): EdgesRefDict {
  /* tslint:disable:no-string-literal */
  const ref: string = json['$ref'];
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
