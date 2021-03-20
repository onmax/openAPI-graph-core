import { fetcher } from '../../src/fetcher';
import { OpenAPIGraphsManager } from '../../src/graph';


test('Creates a graph from the petstore specification', async () => {
    const petstoreApis = await fetcher("tests/resources/petstore");
    const petstoreGraphs = new OpenAPIGraphsManager(petstoreApis);
    const unusedSchemas = petstoreGraphs.checkForUnusedSchemas();
    expect(unusedSchemas).toHaveLength(1);
    expect(unusedSchemas[0]).toMatchSnapshot({
        content: expect.any(Object),
        name: 'SchemaNotBeingUsed'
    })
});

// TODO
// test('Creates a graph from the social network specification', async () => {
// });