"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaNode = void 0;
const Node_1 = require("./Node");
class SchemaNode extends Node_1.Node {
    constructor(name, content) {
        super(name);
        this.content = content;
    }
}
exports.SchemaNode = SchemaNode;
