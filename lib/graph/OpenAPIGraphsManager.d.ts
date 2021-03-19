import { OpenAPIContent } from "../model";
import { OpenAPIGraphsBuilder } from "./OpenAPIGraphsBuilder";
import { SchemaNode } from "./nodes/SchemaNode";
export declare class OpenAPIGraphsManager {
    builder: OpenAPIGraphsBuilder;
    constructor(apis: OpenAPIContent[]);
    checkForUnusedSchemas(): SchemaNode[];
}
