/**
 * The main goal is to find all openAPI specification given a path.
 * Therefore, it will loop over all files and creating a structured object
 * as a result
 *
 */

import { existsSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { getOpenApisContent } from './openapi';
import { OpenAPIContent } from '../model';

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
    const projectContent = readdirSync(projectPath);
    if (projectContent === undefined || projectContent.length === 0) {
        return []
    }
    const paths = projectContent
        // Find all yml and yaml files
        .filter((p) => p.match(/.*\.(yml|yaml)/gi))
        .map(p => `${projectPath}/${p}`)

    return await getOpenApisContent(paths);

}

// Just for testing reasons https://stackoverflow.com/a/54116079
export const testables = {
    loadsSwaggerFiles,
};
