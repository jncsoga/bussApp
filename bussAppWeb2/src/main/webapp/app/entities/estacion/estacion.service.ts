import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstacion } from 'app/shared/model/estacion.model';

type EntityResponseType = HttpResponse<IEstacion>;
type EntityArrayResponseType = HttpResponse<IEstacion[]>;

@Injectable({ providedIn: 'root' })
export class EstacionService {
  public resourceUrl = SERVER_API_URL + 'api/estacions';

  constructor(protected http: HttpClient) {}

  create(estacion: IEstacion): Observable<EntityResponseType> {
    return this.http.post<IEstacion>(this.resourceUrl, estacion, { observe: 'response' });
  }

  update(estacion: IEstacion): Observable<EntityResponseType> {
    return this.http.put<IEstacion>(this.resourceUrl, estacion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
