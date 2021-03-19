"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefNode = void 0;
const Node_1 = require("../Node");
class RefNode extends Node_1.Node {
    constructor(name, ref) {
        super(name);
        this.ref = ref;
    }
}
exports.RefNode = RefNode;
