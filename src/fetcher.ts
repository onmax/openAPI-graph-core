/**
 * The main goal is to find all openAPI specification given a path.
 * Therefore, it will loop over all files and creating a structured object
 * as a result
 *
 */

import { existsSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { OpenAPIContent } from '../model';
import { getOpenApisContent } from './openapi';

export async function fetcher(path: string): Promise<OpenAPIContent[]> {
  // Converts path to absolute
  path = resolve(path);
  const pathExists = existsSync(path);

  if (!pathExists) {
    throw new Error('The given path does not exist in your system');
  } else {
    return await loadsSwaggerFiles(path);
  }
}

/**
 * Finds all the valid OpenApi specifications given a directory and returns a
 * list of all the specification contents
 *
 * @param projectPath of the project where the specifications are suppose to be
 * @returns a list of OpenAPIContent which has the path, openAPI version
 *          and the content for every specification found inside of the given path
 */
async function loadsSwaggerFiles(projectPath: string): Promise<OpenAPIContent[]> {
  const projectContent = await getFiles(resolve(projectPath));
  if (projectContent === undefined || projectContent.length === 0) {
    return [];
  }

  return await getOpenApisContent(projectContent);
}

async function getFiles(fromPath = './', paths: string[] = []): Promise<string[]> {
  const entries = await readdirSync(fromPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      paths.push(...(await getFiles(`${fromPath}/${entry.name}/`)));
    } else if (entry.name.match(/.*\.(yml|yaml|json)/gi)) {
      paths.push(resolve(`${fromPath}/${entry.name}`));
    }
  }
  return paths;
}

// Just for testing reasons https://stackoverflow.com/a/54116079
export const testables = {
  loadsSwaggerFiles,
  getFiles,
};
