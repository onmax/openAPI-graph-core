import { fetcher } from '../../../src/fetcher';
import { OpenAPIGraphsBuilder } from '../../../src/graph';
import { RefEdge } from '../../../src/graph/edges/ref';


test('Creates a graph from the petstore specification', async () => {
    const petstoreApis = await fetcher("tests/resources/petstore");
    const petstoreBuilder = new OpenAPIGraphsBuilder(petstoreApis);
    expect(petstoreBuilder.graphs[0]).toMatchSnapshot({
        path: expect.stringContaining('tests/resources/petstore'),
    });
    const graph = petstoreBuilder.graphs[0]
    const schemasNames: string[] = Object.values(graph.getSchemaNodes()).map(n => n.name).sort();
    const expected = ["Pet", "Pets", "Error", "SchemaNotBeingUsed"].sort()
    expect(schemasNames).toEqual(expected)

    const refSchemas: RefEdge[] = Object.values(graph.getSchemaRefEdges());
    const expectedSchemas = ['Pets', 'Error', 'Pet'].sort()
    expect(refSchemas.map(n => n.ref).sort()).toStrictEqual(expectedSchemas.map(s => `#/components/schemas/${s}`))
    expect(refSchemas.map(n => n.name).sort()).toStrictEqual(expectedSchemas)
});
