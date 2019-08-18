import React, { useState, useEffect } from 'react';
import API                            from '../services/PlaceholderService';
import { wrapException }              from './errors';

/**
 * Custom react hook for fetching API data
 *
 * It combines useState and useEffect to return :
 *  - The expected data
 *  - A loading status
 *  - An error value
 *  - A retry method
 *
 * @export
 * @param {String} method
 * @param {any[]} params
 */
export function useAPI(method, ...params) {
    // ---- Hooks
    const [data, setData]           = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, onError]          = useState(null);

    // ---- API
    const fetchData = async () => {
      onError(null);
      try {
        setIsLoading(true);
        setData(await API[method](...params));
      } catch (ex) {
        onError(wrapException(ex));
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => { fetchData() }, []);

    return [ data, isLoading, error, fetchData ];
}