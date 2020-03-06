"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNDOABLE = 'RA/UNDOABLE';
exports.startUndoable = (action) => ({
    type: exports.UNDOABLE,
    payload: { action },
});
exports.UNDO = 'RA/UNDO';
exports.undo = () => ({
    type: exports.UNDO,
});
exports.COMPLETE = 'RA/COMPLETE';
exports.complete = () => ({
    type: exports.COMPLETE,
});
exports.START_OPTIMISTIC_MODE = 'RA/START_OPTIMISTIC_MODE';
exports.startOptimisticMode = () => ({
    type: exports.START_OPTIMISTIC_MODE,
});
exports.STOP_OPTIMISTIC_MODE = 'RA/STOP_OPTIMISTIC_MODE';
exports.stopOptimisticMode = () => ({
    type: exports.STOP_OPTIMISTIC_MODE,
});
