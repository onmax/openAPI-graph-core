"use strict";
/**
 * The main goal is to find all openAPI specification given a path.
 * Therefore, it will loop over all files and creating a structured object
 * as a result
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testables = exports.fetcher = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const openapi_1 = require("./openapi");
async function fetcher(path) {
    // Converts path to absolute
    path = path_1.resolve(path);
    const pathExists = fs_1.existsSync(path);
    if (!pathExists) {
        throw new Error('The given path does not exist in your system');
    }
    else {
        return await loadsSwaggerFiles(path);
    }
}
exports.fetcher = fetcher;
/**
 * Finds all the valid OpenApi specifications given a directory and returns a
 * list of all the specification contents
 *
 * @param projectPath of the project where the specifications are suppose to be
 * @returns a list of OpenAPIContent which has the path, openAPI version
 *          and the content for every specification found inside of the given path
 */
async function loadsSwaggerFiles(projectPath) {
    const projectContent = fs_1.readdirSync(projectPath);
    if (projectContent === undefined || projectContent.length === 0) {
        return [];
    }
    const paths = projectContent
        // Find all yml and yaml files
        .filter((p) => p.match(/.*\.(yml|yaml)/gi))
        .map(p => `${projectPath}/${p}`);
    return await openapi_1.getOpenApisContent(paths);
}
// Just for testing reasons https://stackoverflow.com/a/54116079
exports.testables = {
    loadsSwaggerFiles,
};
