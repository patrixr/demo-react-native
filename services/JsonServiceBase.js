import axios        from 'axios'
import _            from 'lodash'

/**
 * A Base service with ready to use Ajax methods
 *
 * @export
 * @class JsonService
 */
export default class JsonService {

  constructor(baseUrl = "/") {
    this.baseUrl = baseUrl;
  }

  request({ path, method = 'GET', params = {}, data = {}, headers = {} }) {
    const url = this.baseUrl + path;
    return axios({
      url,
      baseURL: this.baseUrl,
      method,
      params,
      data,
      headers
    })
    .then(_.property('data'))
    .catch(err => {
      const code  = _.get(err, 'response.status');
      const msg   = _.get(err, 'response.data.error') || 'Server error';

      throw new Error(`${code} ${msg}`);
    })
  }

  async GET(path, params = {}, headers = {}) {
    return this.request({
      path,
      params,
      headers,
      method: 'GET',
    });
  }

  async POST(path, body = {}, headers = {}) {
    return this.request({
      path,
      headers,
      data: body,
      method: 'POST'
    });
  }

  async PUT(path, body = {}, headers = {}) {
    return this.request({
      path,
      headers,
      data: body,
      method: 'PUT'
    });
  }

  async DELETE(path, params = {}, headers = {}) {
    return this.request({
      path,
      params,
      headers,
      method: 'DELETE',
    });
  }

}