import { stringify } from 'query-string';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from '../lib/redux-resource/actions/dataFetchActions';
import { flattenObject } from '../lib/redux-resource/fetch';
import { fetchify, sendify } from '../lib/tools';

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { field, order } = params.sort;
        const query = {
          ...flattenObject(sendify(params.filter)),
          _sort: field,
          _order: order,
          _start: params.pagination ? (params.pagination.page - 1) * params.pagination.perPage : 0,
          _end: params.pagination ? params.pagination.page * params.pagination.perPage : 0,
        };

        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY_REFERENCE: {
        const { field, order } = params.sort;
        const query = {
          ...flattenObject(sendify(params.filter)),
          [params.target]: params.id,
          _sort: field,
          _order: order,
          _start: params.pagination ? (params.pagination.page - 1) * params.pagination.perPage : 0,
          _end: params.pagination ? params.pagination.page * params.pagination.perPage : 0,
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case UPDATE:
        options.body = JSON.stringify(sendify(params.data));
        options.method = typeof options.body === 'string' ? 'PUT' : 'POST';
        if (params.action) {
          url = `${apiUrl}/${resource}/${params.id}/${params.action}`;
        } else {
          url = `${apiUrl}/${resource}/${params.id}`;
        }
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(sendify(params.data));
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      case GET_MANY: {
        const query = {
          id: params.ids,
        };
        url = `${apiUrl}/${resource}?${stringify(query, { arrayFormat: 'bracket' })}`;
        break;
      }
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has('x-total-count')) {
          throw new Error(
            'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?',
          );
        }
        return {
          data: fetchify(json) || [],
          total: Number.parseInt(
            headers
              .get('x-total-count')
              .split('/')
              .pop(),
            10,
          ),
        };
      case CREATE:
        return { data: { ...fetchify(params.data), id: json.id } };
      case DELETE_MANY:
        return { data: fetchify(json) || [] };
      default:
        return { data: fetchify(json) };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    // json-server doesn't handle filters on UPDATE route,
    // so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id) => httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(sendify(params.data)),
        })),
      ).then((responses) => ({
        data: fetchify(responses.map((response) => response.json)) || [],
      }));
    }
    // json-server doesn't handle filters on DELETE route,
    // so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id) => httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })),
      ).then((responses) => ({
        data: fetchify(responses.map((response) => response.json)) || [],
      }));
    }
    const { url, options } = convertDataRequestToHTTP(
      type,
      resource,
      params,
    );

    return httpClient(url, options)
      .then((response) => convertHTTPResponse(response, type, resource, params));
  };
};
