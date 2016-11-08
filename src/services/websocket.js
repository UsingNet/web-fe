import io from 'socket.io-client';

export function connect(host) {
  const socket = io(host, { enablesXDR: false, transports: ['websocket'] });
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

export function disconnect(socket) {
  return new Promise(resolve => {
    socket.on('disconnect', () => {
      resolve('disconnected');
    });

    socket.disconnect();
  });
}
