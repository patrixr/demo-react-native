import _            from 'lodash';
import JsonService  from './JsonServiceBase';

const buildCacheKey = (obj) => {
  return _.map(obj, (val, key) => `${key}=${val}`).join('&');
};

/**
 * Cached JSON Service
 * All the GET responses are saved indefinitely
 *
 * @class CachedJsonService
 * @extends {JsonService}
 */
class CachedJsonService extends JsonService {
  constructor(...args) {
    super(...args);
    this._cache = {};
  }

  async GET(path, params = {}, headers = {}) {
    const cacheKey = path + '?' + buildCacheKey(params);

    if (!this._cache[cacheKey]) {
      this._cache[cacheKey] = await super.GET(path, params, headers);
    }
    return this._cache[cacheKey];
  }
}

export default CachedJsonService;