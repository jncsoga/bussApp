import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BussAppWeb2SharedModule } from 'app/shared/shared.module';
import { RutaComponent } from './ruta.component';
import { RutaDetailComponent } from './ruta-detail.component';
import { RutaUpdateComponent } from './ruta-update.component';
import { RutaDeleteDialogComponent } from './ruta-delete-dialog.component';
import { rutaRoute } from './ruta.route';

@NgModule({
  imports: [BussAppWeb2SharedModule, RouterModule.forChild(rutaRoute)],
  declarations: [RutaComponent, RutaDetailComponent, RutaUpdateComponent, RutaDeleteDialogComponent],
  entryComponents: [RutaDeleteDialogComponent]
})
export class BussAppWeb2RutaModule {}
