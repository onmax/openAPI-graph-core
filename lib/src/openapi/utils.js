"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenApisContent = void 0;
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
/**
 * reads the contents of all given paths. The files will be validated.
 *
 * @param paths of the .yaml|.yml files. The paths should exists.
 * @returns the contents of the files as JSON with their path
 */
async function getOpenApisContent(paths) {
    // TODO Check that only v3 are valid
    // Validates it contents, but they are
    const validationPromises = paths.map(p => swagger_parser_1.default.validate(p));
    // Filter only promises which return some content
    const validationResponse = await Promise.allSettled(validationPromises);
    return validationResponse.map((v, i) => ({ promise: v, path: paths[i] }))
        .filter(r => r.promise.status === 'fulfilled')
        // as you can see, the file is read twice. One in the SwaggerParser.validate
        // and another one here. It cool be cool to get SwaggerParser.validate value dereferenced
        .map(r => ({ path: r.path, content: js_yaml_1.load(fs_1.readFileSync(r.path, 'utf8')) }));
}
exports.getOpenApisContent = getOpenApisContent;
