"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = require("query-string");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
exports.createHeadersFromOptions = (options) => {
    const requestHeaders = (options.headers
        || new Headers({
            Accept: 'application/json',
        }));
    if (!requestHeaders.has('Content-Type')
        && !(options && (!options.method || options.method === 'GET'))
        && !(options && options.body && options.body instanceof FormData)) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }
    return requestHeaders;
};
exports.fetchJson = (url, options = {}) => {
    const requestHeaders = exports.createHeadersFromOptions(options);
    return fetch(url, { ...options, headers: requestHeaders })
        .then((response) => response.text().then((text) => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
    })))
        .then(({ status, statusText, headers, body, }) => {
        let json;
        try {
            json = JSON.parse(body);
        }
        catch (e) {
            // not json, no big deal
        }
        if (status < 200 || status >= 300) {
            return Promise.reject(new HttpError_1.default((json && json.message) || statusText, status, json));
        }
        return Promise.resolve({
            status, headers, body, json,
        });
    });
};
exports.queryParameters = query_string_1.stringify;
function isValidObject(value) {
    if (!value) {
        return false;
    }
    const isArray = Array.isArray(value);
    // @ts-ignore
    const isBuffer = typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
    const isObject = Object.prototype.toString.call(value) === '[object Object]';
    const hasKeys = !!Object.keys(value).length;
    return !isArray && !isBuffer && isObject && hasKeys;
}
function flattenObject(value, path = []) {
    if (isValidObject(value)) {
        return Object.assign({}, ...Object.keys(value).map((key) => (
        // @ts-ignore
        flattenObject(value[key], path.concat([key])))));
    }
    return path.length ? { [path.join('.')]: value } : value;
}
exports.flattenObject = flattenObject;
