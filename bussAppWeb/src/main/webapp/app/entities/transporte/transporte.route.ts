import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransporte, Transporte } from 'app/shared/model/transporte.model';
import { TransporteService } from './transporte.service';
import { TransporteComponent } from './transporte.component';
import { TransporteDetailComponent } from './transporte-detail.component';
import { TransporteUpdateComponent } from './transporte-update.component';

@Injectable({ providedIn: 'root' })
export class TransporteResolve implements Resolve<ITransporte> {
  constructor(private service: TransporteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransporte> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transporte: HttpResponse<Transporte>) => {
          if (transporte.body) {
            return of(transporte.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Transporte());
  }
}

export const transporteRoute: Routes = [
  {
    path: '',
    component: TransporteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.transporte.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TransporteDetailComponent,
    resolve: {
      transporte: TransporteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.transporte.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TransporteUpdateComponent,
    resolve: {
      transporte: TransporteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.transporte.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TransporteUpdateComponent,
    resolve: {
      transporte: TransporteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bussAppWebApp.transporte.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
