import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PublishingItemsService {

  constructor(private _http: Http) {}

  public getPublishingItems(): Observable<any> {
    return this._http.get('/api/publishing-items/')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json());
  }

}
