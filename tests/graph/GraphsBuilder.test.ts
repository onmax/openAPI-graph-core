import { fetcher } from '../../src/fetcher';
import { RefNode } from '../../src/graph/nodes/ref/RefNode';
import { OpenAPIGraphsBuilder } from '../../src/graph';
import { OpenAPIGraph } from '../../src/graph/OpenAPIGraph';


test('Creates a graph from the petstore specification', async () => {
    const petstoreApis = await fetcher("tests/resources/petstore");
    const petstoreBuilder = new OpenAPIGraphsBuilder(petstoreApis);
    expect(petstoreBuilder.graphs[0]).toMatchSnapshot({
        name: "Swagger Petstore",
        content: expect.any(OpenAPIGraph)
    });
    const graph = petstoreBuilder.graphs[0]
    const schemasNames: string[] = graph.content.getSchemaNodes().map(n => n.name).sort();
    const expected = ["Pet", "Pets", "Error", "SchemaNotBeingUsed"].sort()
    expect(schemasNames).toEqual(expected)

    const refSchemas: RefNode[] = graph.content.getRefNode();
    const expectedSchemas = ['Pets', 'Error', 'Error', 'Pet', 'Pet', 'Error'].sort()
    expect(refSchemas.map(n => n.ref).sort()).toStrictEqual(expectedSchemas.map(s => `#/components/schemas/${s}`))
    expect(refSchemas.map(n => n.name).sort()).toStrictEqual(expectedSchemas)
});
