import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private _host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

  constructor() {}

  /**
   * Connects to the server via a websocket.
   * @param ns - The namespace to which we want to connect.
   */
  public connect(ns = '') {
        let connectUri = this._host + ns;

        // NOTE: we can't store the socket in a private variable because this is a singleton service
        // and if we would use two sockets then we wouldn't be able to disconnect from the other one.
        let socket = io.connect(connectUri);
        socket.on('connect', () => console.log(`Connected to '${connectUri}' via socket.io`));
        socket.on('disconnect', () => console.log(`Disconnected from '${connectUri}' via socket.io`));
        socket.on('error', (error: string) => {
            console.log(`An error occured during websocket communication: '${error}'`);
        });
        return socket;
    }

    /**
     * Closes the websocket connection to the server.
     * @param socket - The socket to be closed.
     */
    public disconnect(socket) {
        socket.close();
    }

}
