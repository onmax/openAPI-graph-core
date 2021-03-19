import { fetcher } from "./fetcher";
import { OpenAPIGraphsManager } from "./graph";
import { SchemaNode } from "./graph/nodes/SchemaNode";

export async function getUnusedSchemas(path: string): Promise<SchemaNode[]> {
    const apis = await fetcher(path);
    const graph = new OpenAPIGraphsManager(apis);
    return graph.checkForUnusedSchemas();
}

