import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServicio } from 'app/shared/model/servicio.model';

type EntityResponseType = HttpResponse<IServicio>;
type EntityArrayResponseType = HttpResponse<IServicio[]>;

@Injectable({ providedIn: 'root' })
export class ServicioService {
  public resourceUrl = SERVER_API_URL + 'api/servicios';

  constructor(protected http: HttpClient) {}

  create(servicio: IServicio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(servicio);
    return this.http
      .post<IServicio>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(servicio: IServicio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(servicio);
    return this.http
      .put<IServicio>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServicio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServicio[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(servicio: IServicio): IServicio {
    const copy: IServicio = Object.assign({}, servicio, {
      fecha: servicio.fecha && servicio.fecha.isValid() ? servicio.fecha.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? moment(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((servicio: IServicio) => {
        servicio.fecha = servicio.fecha ? moment(servicio.fecha) : undefined;
      });
    }
    return res;
  }
}
