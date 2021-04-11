# OpenAPI-graph-core

A TS library to manage large API projects defined by OpenAPIv3 specification.

## Installation

Just run

> npm install openapi-graph-core

and you are good to go.

## CLI

This `README.md` is only for the API of this library. You can check the cli to run it in the console [here](https://github.com/onmax/openAPI-graph-cli)

## API

OpenAPI-graph provide two major classes that are accesible called: [`OpenAPIGraphs`](#OpenAPIGraphs) and [`Analyzer`](#Analyzer).

### OpenAPIGraphs

This class will create the graphs of the APIs. You can provide a root path, which will be used to look for the API specifications. For example, a valid root path if we use one of the examples would be:

```javascript
const OpenAPIGrahCore = require('openapi-graph-core');

(async () => {
    const graphs = await new OpenAPIGrahCore.OpenAPIGraphs('./tests/resources/social-network').build()

    /* It will return 
    
    {
        "social-network.yaml": { Omitting graph ... },
        "./posts/posts.yaml": { Omitting graph ... },
        "./users/users.yaml": { Omitting graph ... },
    }
    */
})();
```

### Analyzer

It will analyze the graphs checking different conditions. You can initiazlie as follows (you need to initialize `OpenAPIGrahps`):

```javascript
const OpenAPIGrahCore = require('openapi-graph-core');

(async () => {
    const graphs = await new OpenAPIGrahCore.OpenAPIGraphs('./tests/resources/social-network').build()
    const analyzer = OpenAPIGrahCore.Analyzer(graphs)
})();
```
For now, these function have been developed:

#### Unused schemas

| Function                          | Description  | Returns  | 
|---|---|---|
| getUnusedSchemas()                | It will check all the schemas declared but not being used in the components.schemas container  | [JSON](https://github.com/onmax/openapi-graph-types/blob/main/src/model/Analyzer.ts#L6)  |
| getDeprecatedSchemasBeingUsed()   | It will check all the deprecated schemas declared being in used  | [JSON](https://github.com/onmax/openapi-graph-types/blob/main/src/model/Analyzer.ts#L7)  |

