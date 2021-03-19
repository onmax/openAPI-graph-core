/**
 * The main goal is to find all openAPI specification given a path.
 * Therefore, it will loop over all files and creating a structured object
 * as a result
 *
 */
import { OpenAPIContent } from './model';
export declare function fetcher(path: string): Promise<OpenAPIContent[]>;
/**
 * Finds all the valid OpenApi specifications given a directory and returns a
 * list of all the specification contents
 *
 * @param projectPath of the project where the specifications are suppose to be
 * @returns a list of OpenAPIContent which has the path, openAPI version
 *          and the content for every specification found inside of the given path
 */
declare function loadsSwaggerFiles(projectPath: string): Promise<OpenAPIContent[]>;
export declare const testables: {
    loadsSwaggerFiles: typeof loadsSwaggerFiles;
};
export {};
