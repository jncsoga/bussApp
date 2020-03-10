import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IChofer } from 'app/shared/model/chofer.model';

type EntityResponseType = HttpResponse<IChofer>;
type EntityArrayResponseType = HttpResponse<IChofer[]>;

@Injectable({ providedIn: 'root' })
export class ChoferService {
  public resourceUrl = SERVER_API_URL + 'api/chofers';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/chofers';

  constructor(protected http: HttpClient) {}

  create(chofer: IChofer): Observable<EntityResponseType> {
    return this.http.post<IChofer>(this.resourceUrl, chofer, { observe: 'response' });
  }

  update(chofer: IChofer): Observable<EntityResponseType> {
    return this.http.put<IChofer>(this.resourceUrl, chofer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChofer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChofer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChofer[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}