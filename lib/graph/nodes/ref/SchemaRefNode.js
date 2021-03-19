"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaRefNode = void 0;
const RefNode_1 = require("./RefNode");
class SchemaRefNode extends RefNode_1.RefNode {
    constructor(ref) {
        const splits = ref.split('/');
        super(splits[splits.length - 1], ref);
    }
}
exports.SchemaRefNode = SchemaRefNode;
