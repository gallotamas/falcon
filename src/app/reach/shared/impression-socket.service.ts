import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Impression } from './impression';
import { SocketService } from '../../shared/socket.service';

@Injectable()
export class ImpressionSocketService {
  private static createdImpressionEvent = 'created_impression';
  private _socket: SocketIOClient.Socket;

  constructor(private _socketService: SocketService) {
      this._socket = this._socketService.connect('/reach');
  }

  /**
   * Closes the websocket connection to the server.
   */
  public disconnect() {
      this._socketService.disconnect(this._socket);
  }

  /**
   * Retrieves a data stream for "create" events.
   */
  public created(): Observable<Impression> {
    // Return observable which follows "create" signals from the socket stream.
    return Observable.create((observer: any) => {
      this._socket.on(ImpressionSocketService.createdImpressionEvent,
        (item: Impression) => observer.next(item) );
    });
  }

}
