"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var invariant_1 = __importDefault(require("invariant"));
var DndContext_1 = require("../../common/DndContext");
/**
 * A hook to retrieve the DragDropManager from Context
 */
function useDragDropManager() {
    var dragDropManager = react_1.useContext(DndContext_1.DndContext).dragDropManager;
    invariant_1.default(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
}
exports.useDragDropManager = useDragDropManager;
