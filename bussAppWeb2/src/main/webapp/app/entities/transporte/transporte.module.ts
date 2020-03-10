import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BussAppWeb2SharedModule } from 'app/shared/shared.module';
import { TransporteComponent } from './transporte.component';
import { TransporteDetailComponent } from './transporte-detail.component';
import { TransporteUpdateComponent } from './transporte-update.component';
import { TransporteDeleteDialogComponent } from './transporte-delete-dialog.component';
import { transporteRoute } from './transporte.route';

@NgModule({
  imports: [BussAppWeb2SharedModule, RouterModule.forChild(transporteRoute)],
  declarations: [TransporteComponent, TransporteDetailComponent, TransporteUpdateComponent, TransporteDeleteDialogComponent],
  entryComponents: [TransporteDeleteDialogComponent]
})
export class BussAppWeb2TransporteModule {}
