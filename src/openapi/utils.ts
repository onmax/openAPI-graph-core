import SwaggerParser from '@apidevtools/swagger-parser';
import { readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';
import { OpenAPIV3 } from 'openapi-types';
import { OpenAPIContent } from '../../model';

/**
 * reads the contents of all given paths. The files will be validated.
 *
 * @param paths of the .yaml|.yml files. The paths should exists.
 * @returns the contents of the files as JSON with their path
 */
export async function getOpenApisContent(paths: string[]): Promise<OpenAPIContent[]> {
  // TODO Check that only v3 are valid
  // Validates it contents, but they are
  const validationPromises = paths.map((p) => SwaggerParser.validate(p));
  // Filter only promises which return some content
  const validationResponse = await Promise.allSettled(validationPromises);

  return (
    validationResponse
      .map((v, i) => ({ promise: v, path: paths[i] }))
      .filter((r) => r.promise.status === 'fulfilled')
      // as you can see, the file is read twice. One in the SwaggerParser.validate
      // and another one here. It cool be cool to get SwaggerParser.validate value dereferenced
      .map((r) => ({ path: r.path, content: loadYaml(readFileSync(r.path, 'utf8')) as OpenAPIV3.Document }))
  );
}
