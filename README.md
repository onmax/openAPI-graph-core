# OpenAPI-graph

A TS library to manage large API projects defined by OpenAPIv3 specification.

### This library is under development, and it will likely change

## Installation

Just run

> npm install openapi-graph-core

and you are good to go

## Creating an OpenAPI graph

The constructor needs to be a path of the root of the proyect where all your openAPI specifications are stored which will be fetched automatically.

```javascript
const OpenAPIGraphs = require('openapi-graph-core');

(async () => {
    const graphs = await new OpenAPIGraphs('./').build()
    console.log(graphs)
})();
```