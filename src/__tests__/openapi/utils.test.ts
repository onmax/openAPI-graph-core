import { readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';
import { OpenAPIV3 } from 'openapi-types';
import { getOpenApisContent } from '../../openapi';

function getPetstoreDocApi(path: string): OpenAPIV3.Document {
    return loadYaml(readFileSync(path, 'utf8')) as OpenAPIV3.Document
}
test('Petstore should be validated', async () => {
    const petstorePath = "src/__tests__/resources/petstore/petstore.yaml"
    const paths = [petstorePath, "src/__tests__/resources/petstore/ignore-me.yaml"]
    expect(getOpenApisContent(paths)).resolves.toStrictEqual([{ path: petstorePath, content: getPetstoreDocApi(petstorePath) }])
});