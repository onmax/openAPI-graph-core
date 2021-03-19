import { GraphContainer, OpenAPIContent } from "../model";
export declare class OpenAPIGraphsBuilder {
    graphs: GraphContainer[];
    constructor(apis: OpenAPIContent[]);
    private initializeGraph;
    private getSchemaNodes;
    private getRefNodes;
}
