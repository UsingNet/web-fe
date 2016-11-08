function serialize(obj, prefix) {
  const keys = Object.keys(obj);

  const params = keys.map(key => {
    const k = prefix ? `${prefix}[${key}]` : key;
    const v = obj[key];

    if (typeof v === 'object') {
      return serialize(v, k);
    }

    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
  });

  return params.join('&').replace(/%20/g, '+');
}

export function transformObjectToFitForm(obj) {
  const keys = Object.keys(obj);
  const transformed = {};

  for (const key of keys) {
    transformed[key] = {
      value: obj[key],
    };
  }

  return transformed;
}

export function concatUrlWithParams(url, querystring) {
  return `${url}?${serialize(querystring)}`;
}

export function getUrlParamValueByName(name, url) {
  /* eslint-disable */
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  /* eslint-enable */
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getDatePart(dateString, key = '') {
  if (dateString) {
    const date = new Date(dateString);

    const dateObj = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };

    return dateObj[key];
  }

  return 0;
}

export function deepCopy(target, source) {
  const isArray = Array.isArray(source);
  let dst = isArray && [] || {};

  if (isArray) {
    // eslint-disable-next-line no-param-reassign
    target = target || [];
    dst = dst.concat(target);

    source.forEach((e, i) => {
      if (typeof dst[i] === 'undefined') {
        dst[i] = e;
      } else if (typeof e === 'object') {
        dst[i] = deepCopy(target[i], e);
      } else {
        if (target.indexOf(e) === -1) {
          dst.push(e);
        }
      }
    });
  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(key => {
        dst[key] = target[key];
      });
    }

    Object.keys(source).forEach(key => {
      if (typeof source[key] !== 'object' || !source[key]) {
        dst[key] = source[key];
      } else {
        if (!target[key]) {
          dst[key] = source[key];
        } else {
          dst[key] = deepCopy(target[key], source[key]);
        }
      }
    });
  }

  return dst;
}
