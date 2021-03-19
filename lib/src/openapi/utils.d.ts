import { OpenAPIContent } from "../../model";
/**
 * reads the contents of all given paths. The files will be validated.
 *
 * @param paths of the .yaml|.yml files. The paths should exists.
 * @returns the contents of the files as JSON with their path
 */
export declare function getOpenApisContent(paths: string[]): Promise<OpenAPIContent[]>;
