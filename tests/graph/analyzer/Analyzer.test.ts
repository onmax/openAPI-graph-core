import { OpenAPIGraphsInterface } from 'openapi-graph-types';
import { Analyzer } from '../../../src';
import { OpenAPIGraphs } from '../../../src/graph';


test('Creates a graph from the petstore specification and analyze it', async () => {
    const graphs: OpenAPIGraphsInterface = new OpenAPIGraphs("tests/resources/petstore");
    await graphs.build();
    const analyzer = new Analyzer(graphs);
    expect(Object.values(analyzer.getUnusedSchemas())).toHaveLength(1)
    expect(Object.values(analyzer.getUnusedSchemas())[0]).toHaveLength(1)
    expect(Object.values(analyzer.getUnusedSchemas())[0][0].name).toStrictEqual("SchemaNotBeingUsed")
});

test('Creates a graph from the social network specification and analyze it', async () => {
    const graphs: OpenAPIGraphsInterface = new OpenAPIGraphs("tests/resources/social-network");
    await graphs.build();
    const analyzer = new Analyzer(graphs);
    expect(Object.values(analyzer.getUnusedSchemas())).toHaveLength(3)
    expect(Object.values(analyzer.getUnusedSchemas())[0]).toHaveLength(0)
});
