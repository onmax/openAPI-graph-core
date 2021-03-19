import { resolve } from 'path';

import { fetcher, testables } from '../src/fetcher';
const { loadsSwaggerFiles, getFiles } = testables;

const resourcesDir = `${resolve('.')}/tests/resources`;
const noneProject = `${resourcesDir}/none`;
const petStoreProject = `${resourcesDir}/petstore`;
const socialNetworkProject = `${resourcesDir}/social-network`;

test('Should not load anything', async () => {
    expect(await loadsSwaggerFiles(noneProject)).toEqual([]);
});

test('Should retrieve all the valid openAPI files and load them as JSON in the petstore folder', async () => {
    const expectedPaths = await getFiles(petStoreProject)
    expect(expectedPaths.map(p => {
        const path = p.split('/')
        return path[path.length - 1]
    }).sort()).toStrictEqual(['ignore-me.yaml', 'petstore.yaml']);
    (await loadsSwaggerFiles(petStoreProject)).forEach((o) => {
        expect(o).toMatchSnapshot({
            path: expect.any(String),
            content: expect.any(Object),
        });
        expect(o.content).toMatchSnapshot({
            openapi: expect.any(String),
            info: expect.any(Object),
            paths: expect.any(Object),
        });
    });
});

test('Should raise exception because path does not exists', () => {
    expect(fetcher("this/path/does/not/exists")).rejects.toStrictEqual(new Error('The given path does not exist in your system'));
});


test('Should retrieve all the valid openAPI files and load them as JSON in the social-network folder', async () => {
    const expectedPaths = await getFiles(socialNetworkProject)
    expect(expectedPaths.map(p => {
        const path = p.split('/')
        return path[path.length - 1]
    }).sort()).toStrictEqual(['posts.yaml', 'social-network.yaml', 'users.yaml']);

    const apis = await loadsSwaggerFiles(socialNetworkProject);
    expect(apis).toHaveLength(3);
    apis.forEach((o) => {
        expect(o).toMatchSnapshot({
            path: expect.any(String),
            content: expect.any(Object),
        });
        expect(o.content).toMatchSnapshot({
            openapi: expect.any(String),
            info: expect.any(Object),
            paths: expect.any(Object),
        });
    });
});