import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'transporte',
        loadChildren: () => import('./transporte/transporte.module').then(m => m.BussAppWeb2TransporteModule)
      },
      {
        path: 'estacion',
        loadChildren: () => import('./estacion/estacion.module').then(m => m.BussAppWeb2EstacionModule)
      },
      {
        path: 'chofer',
        loadChildren: () => import('./chofer/chofer.module').then(m => m.BussAppWeb2ChoferModule)
      },
      {
        path: 'ruta',
        loadChildren: () => import('./ruta/ruta.module').then(m => m.BussAppWeb2RutaModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.BussAppWeb2ClienteModule)
      },
      {
        path: 'servicio',
        loadChildren: () => import('./servicio/servicio.module').then(m => m.BussAppWeb2ServicioModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BussAppWeb2EntityModule {}
