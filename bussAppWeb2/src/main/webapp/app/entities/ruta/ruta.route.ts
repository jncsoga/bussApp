import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRuta, Ruta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';
import { RutaComponent } from './ruta.component';
import { RutaDetailComponent } from './ruta-detail.component';
import { RutaUpdateComponent } from './ruta-update.component';

@Injectable({ providedIn: 'root' })
export class RutaResolve implements Resolve<IRuta> {
  constructor(private service: RutaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRuta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ruta: HttpResponse<Ruta>) => {
          if (ruta.body) {
            return of(ruta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ruta());
  }
}

export const rutaRoute: Routes = [
  {
    path: '',
    component: RutaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rutas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RutaDetailComponent,
    resolve: {
      ruta: RutaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rutas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RutaUpdateComponent,
    resolve: {
      ruta: RutaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rutas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RutaUpdateComponent,
    resolve: {
      ruta: RutaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rutas'
    },
    canActivate: [UserRouteAccessService]
  }
];
