"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __importDefault(require("invariant"));
var js_utils_1 = require("../utils/js_utils");
var utils_1 = require("./utils");
var decorateHandler_1 = __importDefault(require("./decorateHandler"));
var registration_1 = require("../common/registration");
var DragSourceMonitorImpl_1 = require("../common/DragSourceMonitorImpl");
var SourceConnector_1 = require("../common/SourceConnector");
var isValidType_1 = require("../utils/isValidType");
var createSourceFactory_1 = __importDefault(require("./createSourceFactory"));
/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */
function DragSource(type, spec, collect, options) {
    if (options === void 0) { options = {}; }
    utils_1.checkDecoratorArguments('DragSource', 'type, spec, collect[, options]', type, spec, collect, options);
    var getType = type;
    if (typeof type !== 'function') {
        invariant_1.default(isValidType_1.isValidType(type), 'Expected "type" provided as the first argument to DragSource to be ' +
            'a string, or a function that returns a string given the current props. ' +
            'Instead, received %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', type);
        getType = function () { return type; };
    }
    invariant_1.default(js_utils_1.isPlainObject(spec), 'Expected "spec" provided as the second argument to DragSource to be ' +
        'a plain object. Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', spec);
    var createSource = createSourceFactory_1.default(spec);
    invariant_1.default(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' +
        'a function that returns a plain object of props to inject. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    invariant_1.default(js_utils_1.isPlainObject(options), 'Expected "options" provided as the fourth argument to DragSource to be ' +
        'a plain object when specified. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    return function decorateSource(DecoratedComponent) {
        return decorateHandler_1.default({
            containerDisplayName: 'DragSource',
            createHandler: createSource,
            registerHandler: registration_1.registerSource,
            createConnector: function (backend) { return new SourceConnector_1.SourceConnector(backend); },
            createMonitor: function (manager) {
                return new DragSourceMonitorImpl_1.DragSourceMonitorImpl(manager);
            },
            DecoratedComponent: DecoratedComponent,
            getType: getType,
            collect: collect,
            options: options,
        });
    };
}
exports.DragSource = DragSource;
