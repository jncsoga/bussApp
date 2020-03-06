import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BussAppWebSharedModule } from 'app/shared/shared.module';
import { EstacionComponent } from './estacion.component';
import { EstacionDetailComponent } from './estacion-detail.component';
import { EstacionUpdateComponent } from './estacion-update.component';
import { EstacionDeleteDialogComponent } from './estacion-delete-dialog.component';
import { estacionRoute } from './estacion.route';

@NgModule({
  imports: [BussAppWebSharedModule, RouterModule.forChild(estacionRoute)],
  declarations: [EstacionComponent, EstacionDetailComponent, EstacionUpdateComponent, EstacionDeleteDialogComponent],
  entryComponents: [EstacionDeleteDialogComponent]
})
export class BussAppWebEstacionModule {}
