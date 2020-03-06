"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const fetchSaga_1 = __importDefault(require("./fetchSaga"));
/**
 * @param {Object} dataProvider A Data Provider function
 // * @param {Function} authProvider An Authentication Provider object
 */
exports.default = (dataProvider) => function* resources() {
    yield effects_1.all([
        // auth(authProvider)(),
        // undo(),
        fetchSaga_1.default(dataProvider)(),
    ]);
};
