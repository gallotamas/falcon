import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Impression } from './impression';

@Injectable()
export class ImpressionsService {

  private _baseUrl: string = '/api/post-impressions/';

  constructor(private _http: Http) {}

  /**
   * Gets the post impressions.
   */
  public get(): Observable<Impression[]> {
    return this._http.get(this._baseUrl)
      .map((response: Response) => { return <Impression[]>response.json(); })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }

}
