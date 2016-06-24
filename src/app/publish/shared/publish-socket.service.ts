import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { PublishingItem } from './publishing-item';

@Injectable()
export class PublishSocketService {
    private static createdPublishingItemEvent = 'created_publishing_item';
    private static updatedPublishingItemEvent = 'updated_publishing_item';
    private static deletedPublishingItemEvent = 'deleted_publishing_item';

    private _host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    private _socket: SocketIOClient.Socket;

    constructor() {}

    public connect(ns = '') {
        let connectUri = this._host + ns;
        this._socket = io.connect(connectUri);
        this._socket.on('connect', () => console.log(`Connected to '${connectUri}'`));
        this._socket.on('disconnect', () => console.log(`Disconnected from '${connectUri}'`));
        this._socket.on('error', (error: string) => {
            console.log(`An error occured during websocket communication: '${error}'`);
        });
    }

    public disconnect() {
        this._socket.close();
    }

    public created(): Observable<PublishingItem> {
        // Return observable which follows "create" signals from the socket stream.
        return Observable.create((observer: any) => {
            this._socket.on(PublishSocketService.createdPublishingItemEvent,
                (item: PublishingItem) => observer.next(item) );
        });
    }

    public updated(): Observable<PublishingItem> {
        // Return observable which follows "update" signals from the socket stream.
        return Observable.create((observer: any) => {
            this._socket.on(PublishSocketService.updatedPublishingItemEvent,
                (item: PublishingItem) => observer.next(item) );
        });
    }

    public deleted(): Observable<string> {
        // Return observable which follows "delete" signals from the socket stream.
        return Observable.create((observer: any) => {
            this._socket.on(PublishSocketService.deletedPublishingItemEvent,
                (id: string) => observer.next(id) );
        });
    }
}
