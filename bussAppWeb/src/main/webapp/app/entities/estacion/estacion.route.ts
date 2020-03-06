import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstacion, Estacion } from 'app/shared/model/estacion.model';
import { EstacionService } from './estacion.service';
import { EstacionComponent } from './estacion.component';
import { EstacionDetailComponent } from './estacion-detail.component';
import { EstacionUpdateComponent } from './estacion-update.component';

@Injectable({ providedIn: 'root' })
export class EstacionResolve implements Resolve<IEstacion> {
  constructor(private service: EstacionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estacion: HttpResponse<Estacion>) => {
          if (estacion.body) {
            return of(estacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Estacion());
  }
}

export const estacionRoute: Routes = [
  {
    path: '',
    component: EstacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.estacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstacionDetailComponent,
    resolve: {
      estacion: EstacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.estacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstacionUpdateComponent,
    resolve: {
      estacion: EstacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.estacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstacionUpdateComponent,
    resolve: {
      estacion: EstacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.estacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
