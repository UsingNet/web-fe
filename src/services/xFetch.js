import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { message } from 'antd';
import { LOGIN } from 'constants/Network';

const errorMessages = (res) => `${res.status} ${res.statusText}`;
const defaultOpts = {
  credentials: 'same-origin',
};

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    message.error('请求地址不存在');
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {
  const { success, msg, code } = res.jsonResult;
  if (code === 408 || code === 409) {
    message.error(msg);
    location.href = LOGIN;
    return Promise.reject(msg);
  }

  if (!success || code === 403) {
    message.error(msg);
    return Promise.reject(msg);
  }
  return res;
}

function xFetch(url, options) {
  const opts = { ...defaultOpts, ...options };
  opts.headers = {
    ...opts.headers,
    authorization: cookie.get('authorization') || '',
  };

  return fetch(url, opts)
  .then(check401)
  .then(check404)
  .then(jsonParse)
  .then(errorMessageParse)
  .catch(errorMsg => ({ errorMsg }));
}

export default xFetch;
