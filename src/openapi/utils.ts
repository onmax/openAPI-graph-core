import SwaggerParser from '@apidevtools/swagger-parser';
import { readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';
import { OpenAPI, OpenAPIV3 } from 'openapi-types';
import { OpenAPIContent } from 'openapi-graph-types';
const logger = require('pino')({
  prettyPrint: {
    ignore: 'time,pid,hostname',
    singleLine: true
  }
})

/**
 * reads the contents of all given paths. The files will be validated.
 *
 * @param paths of the .yaml|.yml files. The paths should exists.
 * @returns the contents of the files as JSON with their path
 */
export async function getOpenApisContent(paths: string[]): Promise<OpenAPIContent[]> {
  return (
    paths
      .map(p => ({ path: p, content: loadYaml(readFileSync(p, 'utf8')) || logger.warn(`Couldn't load ${p}`) }))
      .filter(p => p.content?.openapi?.includes("3.0"))
  );
}
