const domain = location.host.replace(/^(\w+)\./, '');
const protocol = location.protocol;

export const LOGIN = `https://auth.${domain}`;
export const LOGOUT = `https://auth.${domain}/logout`;
export const API = `${protocol}//${location.host}/v2`;
export const SOCKET = `wss://socket.${domain}/?token=`;
export const VOIP_TOKEN = 'aaf98f8951af2ba80151c2135efe4650';

export const POST_HEADER = {
  'Content-Type': 'application/json',
};
