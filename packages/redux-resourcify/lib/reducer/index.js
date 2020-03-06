"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
const data_1 = __importDefault(require("./data"));
const list_1 = __importDefault(require("./list"));
const initialState = {};
exports.default = (previousState = initialState, action) => {
    if (action.type === actions_1.REGISTER_RESOURCE) {
        const resourceState = {
            props: action.payload,
            data: data_1.default(undefined, action),
            list: list_1.default(undefined, action),
        };
        return {
            ...previousState,
            [action.payload.name]: resourceState,
        };
    }
    if (action.type === actions_1.UNREGISTER_RESOURCE) {
        return Object.keys(previousState).reduce((acc, key) => {
            if (key === action.payload) {
                return acc;
            }
            // @ts-ignore
            return { ...acc, [key]: previousState[key] };
        }, {});
    }
    if (!action.meta || !action.meta.resource) {
        return previousState;
    }
    const resources = Object.keys(previousState);
    // @ts-ignore
    const newState = resources.reduce((acc, resource) => ({
        ...acc,
        [resource]: 
        // @ts-ignore
        action.meta.resource === resource
            ? {
                // @ts-ignore
                props: previousState[resource].props,
                // @ts-ignore
                data: data_1.default(previousState[resource].data, action),
                // @ts-ignore
                list: list_1.default(previousState[resource].list, action),
            }
            // @ts-ignore
            : previousState[resource],
    }), {});
    return newState;
};
