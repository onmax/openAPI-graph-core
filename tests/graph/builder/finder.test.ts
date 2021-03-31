import { readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';
import { OpenAPIV3 } from 'openapi-types';
import { EdgesRefDict, RefType, SchemaNodeInterface } from 'openapi-graph-types';
import { getRefEdges, getSchemaNodes } from '../../../src/graph/builder';

function getPetstoreDocApi(path: string): OpenAPIV3.Document {
    return loadYaml(readFileSync(path, 'utf8')) as OpenAPIV3.Document
}
test('Should get all schemas correctly as SchemaNode array', () => {
    const petstorePath = "tests/resources/petstore/petstore.yaml"
    const schemaNodes: SchemaNodeInterface[] = Object.values(getSchemaNodes(getPetstoreDocApi(petstorePath)))
    expect(schemaNodes.map(n => n.name).sort()).toStrictEqual(['Pet', 'Pets', 'Error', 'SchemaNotBeingUsed', 'inline-schema-1'].sort())
    // TODO Check for values in the schema
    // schemaNodes.forEach(api => {
    //     expect(api.content).not.toBe(undefined)
    //     expect(api.content).not.toBe(null)
    // })
});

test('Should get all reference to schemas correctly as EdgesRefDict array', () => {
    const petstorePath = "tests/resources/petstore/petstore.yaml"
    const schemaRefNodes = Object.values(getRefEdges(getPetstoreDocApi(petstorePath), petstorePath).schemaRef);
    const expectedSchemas = ['Pets', 'Error', 'Pet'].sort()
    expect(schemaRefNodes.map(n => n.specificationPath).sort()).toStrictEqual(expectedSchemas.map(s => `/components/schemas/${s}`))
    expect(schemaRefNodes.map(n => n.rawPath).sort()).toStrictEqual(expectedSchemas.map(s => `#/components/schemas/${s}`))
    expect(schemaRefNodes.map(n => n.tokenName).sort()).toStrictEqual(expectedSchemas)
    schemaRefNodes.map(n => expect(n.filePath).toContain("tests/resources/petstore/petstore.yaml"))
    schemaRefNodes.map(n => expect(n.path).toContain("tests/resources/petstore/petstore.yaml#/components/schemas/"))
    schemaRefNodes.map(n => expect(n.type).toStrictEqual(RefType.Local))
});
