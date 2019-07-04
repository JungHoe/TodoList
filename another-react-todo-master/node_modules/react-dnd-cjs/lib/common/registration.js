"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerTarget(type, target, manager) {
    var registry = manager.getRegistry();
    var targetId = registry.addTarget(type, target);
    return [targetId, function () { return registry.removeTarget(targetId); }];
}
exports.registerTarget = registerTarget;
function registerSource(type, source, manager) {
    var registry = manager.getRegistry();
    var sourceId = registry.addSource(type, source);
    return [sourceId, function () { return registry.removeSource(sourceId); }];
}
exports.registerSource = registerSource;
