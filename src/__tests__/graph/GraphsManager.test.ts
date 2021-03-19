import { fetcher } from '../../fetcher';
import { OpenAPIGraphsManager } from '../../graph';


test('Creates a graph from the petstore specification', async () => {
    const petstoreApis = await fetcher("src/__tests__/resources/petstore");
    const petstoreGraphs = new OpenAPIGraphsManager(petstoreApis);
    const unusedSchemas = petstoreGraphs.checkForUnusedSchemas();
    expect(unusedSchemas).toHaveLength(1);
    expect(unusedSchemas[0]).toMatchSnapshot({
        content: expect.any(Object),
        name: 'SchemaNotBeingUsed'
    })
});
