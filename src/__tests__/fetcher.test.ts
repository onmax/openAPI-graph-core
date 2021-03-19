import { resolve } from 'path';

import { fetcher, testables } from '../fetcher';
const { loadsSwaggerFiles } = testables;

const resourcesDir = `${resolve('.')}/src/__tests__/resources`;
const noneProject = `${resourcesDir}/none`;
const petStoreProject = `${resourcesDir}/petstore`;

test('Should not load anything', async () => {
    expect(await loadsSwaggerFiles(noneProject)).toEqual([]);
});

test('Should retrieve all the valid openAPI files and load them as JSON in the petstore folder', async () => {
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
