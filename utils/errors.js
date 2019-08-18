import _ from 'lodash';

const DEFAULT_ERROR_MESSAGE = 'Unknown error';

/**
 * Standardize the Errors across the app
 *
 * @export
 * @param {*} err
 * @returns {Error} an Error object
 */
export function wrapException(err) {
    if (err instanceof Error) {
      return err;
    }

    let message = err.message
      || _.get(err, 'response.data.error')
      || DEFAULT_ERROR_MESSAGE;

    return new Error(message);
}