import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log('Initializing new Socket.IO server...');

    // Check if res.socket is not null before accessing
    if (res.socket) {
      const io = new SocketIOServer(res.socket.server, {
        path: '/api/socket',
      });

      // Setup event listeners for new connections
      io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });

      // Attach `io` to `res.socket.server` to avoid reinitialization
      res.socket.server.io = io;
    }
  } else {
    console.log('Socket.IO server already running.');
  }

  // Return a basic response indicating that Socket.IO is set up
  res.status(200).json({ message: 'Socket.IO server is running' });
}