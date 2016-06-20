import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { PublishingItem } from '../shared/publishing-item';

@Injectable()
export class PublishingItemsService {

  private _baseUrl: string = '/api/publishing-items/';
  private _requestOptions: RequestOptions;

  constructor(private _http: Http) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this._requestOptions = new RequestOptions({ headers: headers });
  }

  /**
   * Gets all the publishing item.
   */
  public getAll(): Observable<PublishingItem[]> {
    return this._http.get(this._baseUrl)
      .map((response: Response) => <PublishingItem[]>response.json())
      .catch(this.handleError);
  }

  /**
   * Gets the publishing item with the id provided.
   * @param id - The id of the publishing item.
   */
  public get(id: string): Observable<PublishingItem> {
    return this._http.get(this._baseUrl + id)
      .map((response: Response) => <PublishingItem>response.json())
      .catch(this.handleError);
  }

  /**
   * Updates the provided publishing item.
   * @param item - The publishing item to update.
   */
  public put(item: PublishingItem) {
    return this._http.put(this._baseUrl + item.id, JSON.stringify(item), this._requestOptions)
      .map((response: Response) => <PublishingItem>response.json())
      .catch(this.handleError);
  }

  /**
   * Deletes a publishing item.
   * @param item - The publishing item to delete.
   */
  public delete(item: PublishingItem) {
    // NOTE: subscribe is required even if it's empty, because Observables are lazy
    // and if we don't use the result then it will never do the request.
    this._http.delete(this._baseUrl + item.id)
      .catch(this.handleError)
      .subscribe(() => {});
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json());
  }

}
