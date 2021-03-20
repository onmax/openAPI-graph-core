import { RefType } from '../../../model';
import { fetcher } from '../../../src/fetcher';
import { OpenAPIGraph, OpenAPIGraphsBuilder } from '../../../src/graph';
import { RefEdge } from '../../../src/graph/edges';
import { SchemaNode } from '../../../src/graph/nodes/SchemaNode';

test('Creates a graph from the petstore specification', async () => {
    const petstoreApis = await fetcher("tests/resources/petstore");
    const petstoreBuilder = new OpenAPIGraphsBuilder(petstoreApis);
    expect(petstoreBuilder.graphs).toHaveLength(1);
    expect(petstoreBuilder.graphs[0]).toMatchSnapshot({
        path: expect.stringContaining('tests/resources/petstore'),
        edges: expect.any(Object),
        nodes: expect.any(Object),
    });
    const graph = petstoreBuilder.graphs[0]
    const schemasNames: string[] = Object.values(graph.getSchemaNodes()).map(n => n.name).sort();
    const expected = ["Pet", "Pets", "Error", "SchemaNotBeingUsed"].sort()
    expect(schemasNames).toEqual(expected)

    const refSchemas: RefEdge[] = Object.values(graph.getSchemaRefEdges());
    const expectedSchemas = ['Pets', 'Error', 'Pet'].sort()
    expect(refSchemas.map(n => n.ref).sort()).toStrictEqual(expectedSchemas.map(s => `#/components/schemas/${s}`))
    expect(refSchemas.map(n => n.tokenName).sort()).toStrictEqual(expectedSchemas)
});

test('Creates a graph from the social-network specification', async () => {
    const socialNetworkApis = await fetcher("tests/resources/social-network");
    const socialNetworkBuilder = new OpenAPIGraphsBuilder(socialNetworkApis);
    expect(socialNetworkBuilder.graphs).toHaveLength(3);

    const socialNetworkGraph = socialNetworkBuilder.graphs.find(g => g.path.endsWith('social-network.yaml')) as OpenAPIGraph
    const socialNetworkUsersGraph = socialNetworkBuilder.graphs.find(g => g.path.endsWith('users.yaml')) as OpenAPIGraph
    const socialNetworkPostsGraph = socialNetworkBuilder.graphs.find(g => g.path.endsWith('posts.yaml')) as OpenAPIGraph

    expect(socialNetworkGraph).toMatchSnapshot({
        path: expect.stringContaining('tests/resources/social-network/social-network.yaml'),
    });
    expect(socialNetworkUsersGraph).toMatchSnapshot({
        path: expect.stringContaining('tests/resources/social-network/users'),
    });
    expect(socialNetworkPostsGraph).toMatchSnapshot({
        path: expect.stringContaining('tests/resources/social-network/posts'),
    });

    expect(Object.values(socialNetworkGraph.edges.ref.schemaRef)).toHaveLength(4);
    expect(Object.values(socialNetworkUsersGraph.edges.ref.schemaRef)).toHaveLength(2);
    expect(Object.values(socialNetworkPostsGraph.edges.ref.schemaRef)).toHaveLength(1);

    // Test social-network.yaml
    const expected = ["Username", "Name", "Email", "User", "Post"].sort()
    const schemasSocialNetworkNames: string[] = Object.values(socialNetworkGraph.getSchemaNodes()).map(n => n.name).sort();
    expect(schemasSocialNetworkNames).toEqual(expected)
    const refSocialNetworkNames: RefEdge[] = Object.values(socialNetworkGraph.getSchemaRefEdges());
    const expectedSchemas = ['Username', 'Name', 'Email', 'User'].sort()
    expect(refSocialNetworkNames.map(n => n.ref).sort()).toStrictEqual(expectedSchemas.map(s => `#/components/schemas/${s}`))
    expect(refSocialNetworkNames.map(n => n.tokenName).sort()).toStrictEqual(expectedSchemas)

    // // Test users.yaml
    const schemasUsersNames: string[] = Object.values(socialNetworkUsersGraph.getSchemaNodes()).map(n => n.name).sort();
    expect(schemasUsersNames).toStrictEqual([])
    Object.values(socialNetworkUsersGraph.getSchemaRefEdges()).map(edge => {
        expect(edge.type).toStrictEqual(RefType.Remote)
        expect(edge.child).toBeInstanceOf(SchemaNode)
    })
    expect(Object.values(socialNetworkUsersGraph.getSchemaRefEdges()).map(edge => edge.tokenName).sort()).toStrictEqual(['User', 'Username'].sort())

    // // Test posts.yaml
    const schemasPostsNames: string[] = Object.values(socialNetworkPostsGraph.getSchemaNodes()).map(n => n.name).sort();
    expect(schemasPostsNames).toStrictEqual([])
    Object.values(socialNetworkPostsGraph.getSchemaRefEdges()).map(edge => {
        expect(edge).toBeInstanceOf(RefEdge)
        expect(edge.type).toStrictEqual(RefType.Remote)
        expect(edge.child).toBeInstanceOf(SchemaNode)
    })
    expect(Object.values(socialNetworkPostsGraph.getSchemaRefEdges()).map(edge => edge.tokenName).sort()).toStrictEqual(['Post'])
});