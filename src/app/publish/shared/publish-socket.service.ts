import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { PublishingItem } from './index';
import { SocketService } from '../../shared/index';

@Injectable()
export class PublishSocketService {
    private static createdPublishingItemEvent = 'created_publishing_item';
    private static updatedPublishingItemEvent = 'updated_publishing_item';
    private static deletedPublishingItemEvent = 'deleted_publishing_item';

    private _socket: SocketIOClient.Socket;

    constructor(private _socketService: SocketService) {
        this._socket = this._socketService.connect('/publish');
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
    public created(): Observable<PublishingItem> {
        // Return observable which follows "create" signals from the socket stream.
        return Observable.create((observer: any) => {
            this._socket.on(PublishSocketService.createdPublishingItemEvent,
                (item: PublishingItem) => observer.next(item) );
        });
    }

    /**
     * Retrieves a data stream for "update" events.
     */
    public updated(): Observable<PublishingItem> {
        // Return observable which follows "update" signals from the socket stream.
        return Observable.create((observer: any) => {
            this._socket.on(PublishSocketService.updatedPublishingItemEvent,
                (item: PublishingItem) => observer.next(item) );
        });
    }

    /**
     * Retrieves a data stream for "delete" events.
     */
    public deleted(): Observable<string> {
        // Return observable which follows "delete" signals from the socket stream.
        return Observable.create((observer: any) => {
            this._socket.on(PublishSocketService.deletedPublishingItemEvent,
                (id: string) => observer.next(id) );
        });
    }
}
