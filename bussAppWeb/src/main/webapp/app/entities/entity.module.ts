import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'transporte',
        loadChildren: () => import('./transporte/transporte.module').then(m => m.BussAppWebTransporteModule)
      },
      {
        path: 'estacion',
        loadChildren: () => import('./estacion/estacion.module').then(m => m.BussAppWebEstacionModule)
      },
      {
        path: 'chofer',
        loadChildren: () => import('./chofer/chofer.module').then(m => m.BussAppWebChoferModule)
      },
      {
        path: 'ruta',
        loadChildren: () => import('./ruta/ruta.module').then(m => m.BussAppWebRutaModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.BussAppWebClienteModule)
      },
      {
        path: 'servicio',
        loadChildren: () => import('./servicio/servicio.module').then(m => m.BussAppWebServicioModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BussAppWebEntityModule {}
