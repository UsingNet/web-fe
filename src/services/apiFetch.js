import xFetch from './xFetch';
import { API } from 'constants/Network';

export default async function apiFetch(url, opts) {
  return xFetch(API + url, opts);
}
