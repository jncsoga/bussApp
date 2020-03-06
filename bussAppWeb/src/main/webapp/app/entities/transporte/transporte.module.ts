import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BussAppWebSharedModule } from 'app/shared/shared.module';
import { TransporteComponent } from './transporte.component';
import { TransporteDetailComponent } from './transporte-detail.component';
import { TransporteUpdateComponent } from './transporte-update.component';
import { TransporteDeleteDialogComponent } from './transporte-delete-dialog.component';
import { transporteRoute } from './transporte.route';

@NgModule({
  imports: [BussAppWebSharedModule, RouterModule.forChild(transporteRoute)],
  declarations: [TransporteComponent, TransporteDetailComponent, TransporteUpdateComponent, TransporteDeleteDialogComponent],
  entryComponents: [TransporteDeleteDialogComponent]
})
export class BussAppWebTransporteModule {}
