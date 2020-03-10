import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransporte } from 'app/shared/model/transporte.model';

type EntityResponseType = HttpResponse<ITransporte>;
type EntityArrayResponseType = HttpResponse<ITransporte[]>;

@Injectable({ providedIn: 'root' })
export class TransporteService {
  public resourceUrl = SERVER_API_URL + 'api/transportes';

  constructor(protected http: HttpClient) {}

  create(transporte: ITransporte): Observable<EntityResponseType> {
    return this.http.post<ITransporte>(this.resourceUrl, transporte, { observe: 'response' });
  }

  update(transporte: ITransporte): Observable<EntityResponseType> {
    return this.http.put<ITransporte>(this.resourceUrl, transporte, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransporte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransporte[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
