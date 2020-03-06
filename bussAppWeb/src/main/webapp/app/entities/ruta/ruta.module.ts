import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BussAppWebSharedModule } from 'app/shared/shared.module';
import { RutaComponent } from './ruta.component';
import { RutaDetailComponent } from './ruta-detail.component';
import { RutaUpdateComponent } from './ruta-update.component';
import { RutaDeleteDialogComponent } from './ruta-delete-dialog.component';
import { rutaRoute } from './ruta.route';

@NgModule({
  imports: [BussAppWebSharedModule, RouterModule.forChild(rutaRoute)],
  declarations: [RutaComponent, RutaDetailComponent, RutaUpdateComponent, RutaDeleteDialogComponent],
  entryComponents: [RutaDeleteDialogComponent]
})
export class BussAppWebRutaModule {}
