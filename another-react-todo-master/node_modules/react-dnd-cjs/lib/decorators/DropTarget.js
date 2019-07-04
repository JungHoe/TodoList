"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __importDefault(require("invariant"));
var js_utils_1 = require("../utils/js_utils");
var registration_1 = require("../common/registration");
var isValidType_1 = require("../utils/isValidType");
var TargetConnector_1 = require("../common/TargetConnector");
var DropTargetMonitorImpl_1 = require("../common/DropTargetMonitorImpl");
var utils_1 = require("./utils");
var decorateHandler_1 = __importDefault(require("./decorateHandler"));
var createTargetFactory_1 = __importDefault(require("./createTargetFactory"));
function DropTarget(type, spec, collect, options) {
    if (options === void 0) { options = {}; }
    utils_1.checkDecoratorArguments('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);
    var getType = type;
    if (typeof type !== 'function') {
        invariant_1.default(isValidType_1.isValidType(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' +
            'a string, an array of strings, or a function that returns either given ' +
            'the current props. Instead, received %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', type);
        getType = function () { return type; };
    }
    invariant_1.default(js_utils_1.isPlainObject(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' +
        'a plain object. Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', spec);
    var createTarget = createTargetFactory_1.default(spec);
    invariant_1.default(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' +
        'a function that returns a plain object of props to inject. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    invariant_1.default(js_utils_1.isPlainObject(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' +
        'a plain object when specified. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    return function decorateTarget(DecoratedComponent) {
        return decorateHandler_1.default({
            containerDisplayName: 'DropTarget',
            createHandler: createTarget,
            registerHandler: registration_1.registerTarget,
            createMonitor: function (manager) {
                return new DropTargetMonitorImpl_1.DropTargetMonitorImpl(manager);
            },
            createConnector: function (backend) { return new TargetConnector_1.TargetConnector(backend); },
            DecoratedComponent: DecoratedComponent,
            getType: getType,
            collect: collect,
            options: options,
        });
    };
}
exports.DropTarget = DropTarget;
