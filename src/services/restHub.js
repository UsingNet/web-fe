import xFetch from './xFetch';
import { API } from 'constants/Network';

const defaultPostOpts = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const defaultPutOpts = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
};

const defaultDeleteOpts = {
  method: 'DELETE',
};

function mergeOptions(defaultOpts, opts) {
  if (typeof opts === 'object') {
    return { ...defaultOpts, ...opts };
  }

  return defaultOpts;
}

async function apiFetch(url, opts) {
  return xFetch(API + url, opts);
}

function get(url, opts) {
  return apiFetch(url, opts);
}

function post(url, opts) {
  if (opts.body) {
    // eslint-disable-next-line no-param-reassign
    opts.body = JSON.stringify(opts.body);
  }

  const options = mergeOptions(defaultPostOpts, opts);

  return apiFetch(url, options);
}

function put(url, opts) {
  if (opts.body) {
    // eslint-disable-next-line no-param-reassign
    opts.body = JSON.stringify(opts.body);
  }

  const options = mergeOptions(defaultPutOpts, opts);

  return apiFetch(url, options);
}

function remove(url, opts) {
  const options = mergeOptions(defaultDeleteOpts, opts);

  return apiFetch(url, options);
}

export default {
  get,
  post,
  put,
  remove,
};
