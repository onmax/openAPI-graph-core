# Swagger-graph

A TS library to manage large API projects defined by OpenAPIv3 specification.

### This library is under development, and it will likely change

## Installation

Just run

> npm install openapi-graph

and you are good to go

## Functions

For now, just one function is being exposed

### `getUnusedSchemas(path: string)`

It will create a OpenAPIGraph, and get the schemas that are not being used as a list.

#### Arguments

`path: string` - Abosolute, relative or url where the API has being defined

#### Returns

A list of `Schemas` that are not being used in the API. 

#### Example

```javascript
const openApiGraph = require('openapi-graph');

(async () => {
    const a = await openApiGraph.getUnusedSchemas('./')
    console.log(a)
})();
```