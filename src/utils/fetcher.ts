/**
 * The main goal is to find all openAPI specification given a path.
 * Therefore, it will loop over all files and creating a structured object
 * as a result
 *
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';
import { LogLevel, OpenAPIContent } from 'openapi-graph-types';
import { resolve } from 'path';
import { log } from '.';

const COMMON_FOLDER_NAMES = ["node_modules", "target"]
const COMMON_FILES_NAMES = ["docker-compose"].flatMap(e => [`${e}.yml`, `${e}.yaml`])

export async function fetcher(paths: string[]): Promise<OpenAPIContent[]>;
export async function fetcher(path: string): Promise<OpenAPIContent[]>;
export async function fetcher(input: any): Promise<OpenAPIContent[]> {
  if (typeof input === 'string') {
    // If we are working with a path, then it means that we have to find all openAPI specifications

    // Converts path to absolute
    const resolvedPath = resolve(input);
    const pathExists = existsSync(resolvedPath);
    if (!pathExists) {
      throw new Error('The given path does not exist in your system');
    } else {
      return await loadsSwaggerFiles(resolvedPath);
    }
  } else if (([]).constructor === input.constructor) {
    // If we are working with a path, then it means that we have to find all openAPI specifications
    const resolvedPaths = (input as string[])
      .map(i => resolve(input))
      .filter(resolvedPath => existsSync(resolvedPath) || log(`Ignoring ${resolvedPath} because the path is not reachable`, LogLevel.WARN));
    return getOpenApisContent(resolvedPaths);
  } else {
    log(`Invalid given input. It was expected a string or array of strings. Received ${input}`, LogLevel.WARN);
    return [];
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
  log(`Found (${projectContent.length}) ${projectContent}`);
  if (projectContent === undefined || projectContent.length === 0) {
    return [];
  }

  return await getOpenApisContent(projectContent);
}

async function getFiles(fromPath = './', paths: string[] = []): Promise<string[]> {
  const entries = await readdirSync(fromPath, { withFileTypes: true });
  for (const entry of entries) {
    // We don't check hidden files or folders
    if (!/(^|\/)\.[^/.]/g.test(entry.name)) {
      if (
        entry.isDirectory() &&
        // Don't check common folder names
        !COMMON_FOLDER_NAMES.includes(entry.name)) {
        paths.push(...(await getFiles(`${fromPath}/${entry.name}/`)));
      } else if (
        entry.isFile() &&
        // JSON are also valid, but they are more generic, so we don't look for them because it takes a lot of time
        entry.name.match(/.*\.(yml|yaml)/gi) &&
        // Don't check common file names
        !COMMON_FILES_NAMES.includes(entry.name)) {
        paths.push(resolve(`${fromPath}/${entry.name}`));
      }
    }
  }
  return paths;
}

/**
 * reads the contents of all given paths. The files will be validated.
 *
 * @param paths of the .yaml|.yml files. The paths should exists.
 * @returns the contents of the files as JSON with their path
 */
async function getOpenApisContent(paths: string[]): Promise<OpenAPIContent[]> {
  return (
    paths
      .map(p => ({ path: p, content: loadYaml(readFileSync(p, 'utf8')) || log(`Couldn't load ${p}`, LogLevel.WARN) }))
      .filter(p => p.content?.openapi?.includes("3.0"))
  );
}

// Just for testing reasons https://stackoverflow.com/a/54116079
export const testables = {
  loadsSwaggerFiles,
  getFiles,
  getOpenApisContent
};
