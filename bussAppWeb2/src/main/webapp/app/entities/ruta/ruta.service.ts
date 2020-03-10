import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRuta } from 'app/shared/model/ruta.model';

type EntityResponseType = HttpResponse<IRuta>;
type EntityArrayResponseType = HttpResponse<IRuta[]>;

@Injectable({ providedIn: 'root' })
export class RutaService {
  public resourceUrl = SERVER_API_URL + 'api/rutas';

  constructor(protected http: HttpClient) {}

  create(ruta: IRuta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ruta);
    return this.http
      .post<IRuta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ruta: IRuta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ruta);
    return this.http
      .put<IRuta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRuta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRuta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ruta: IRuta): IRuta {
    const copy: IRuta = Object.assign({}, ruta, {
      inicio: ruta.inicio && ruta.inicio.isValid() ? ruta.inicio.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.inicio = res.body.inicio ? moment(res.body.inicio) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ruta: IRuta) => {
        ruta.inicio = ruta.inicio ? moment(ruta.inicio) : undefined;
      });
    }
    return res;
  }
}
