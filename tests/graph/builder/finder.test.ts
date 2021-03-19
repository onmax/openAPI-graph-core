import { readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';
import { OpenAPIV3 } from 'openapi-types';
import { EdgesRefDict } from '../../../model';
import { getRefEdges, getSchemaNodes } from '../../../src/graph/builder';
import { SchemaRefEdge } from '../../../src/graph/edges/ref';
import { SchemaNode } from '../../../src/graph/nodes/SchemaNode';

function getPetstoreDocApi(path: string): OpenAPIV3.Document {
    return loadYaml(readFileSync(path, 'utf8')) as OpenAPIV3.Document
}
test('Should get all schemas correctly as SchemaNode array', () => {
    const petstorePath = "tests/resources/petstore/petstore.yaml"
    const schemaNodes: SchemaNode[] = Object.values(getSchemaNodes(getPetstoreDocApi(petstorePath)))
    expect(schemaNodes.map(n => n.name).sort()).toStrictEqual(['Pet', 'Pets', 'Error', 'SchemaNotBeingUsed'].sort())
    schemaNodes.forEach(api => {
        expect(api.content).not.toBe(undefined)
        expect(api.content).not.toBe(null)
    })
});

test('Should get all reference to schemas correctly as RefNode array', () => {
    const petstorePath = "tests/resources/petstore/petstore.yaml"
    const schemaRefNodes: EdgesRefDict = getRefEdges(getPetstoreDocApi(petstorePath));
    const expectedSchemas = ['Pets', 'Error', 'Pet'].sort()
    expect(Object.values(schemaRefNodes.schemaRef).map(n => n.ref).sort()).toStrictEqual(expectedSchemas.map(s => `#/components/schemas/${s}`))
});
