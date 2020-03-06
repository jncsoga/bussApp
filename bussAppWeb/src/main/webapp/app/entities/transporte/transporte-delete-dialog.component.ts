import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransporte } from 'app/shared/model/transporte.model';
import { TransporteService } from './transporte.service';

@Component({
  templateUrl: './transporte-delete-dialog.component.html'
})
export class TransporteDeleteDialogComponent {
  transporte?: ITransporte;

  constructor(
    protected transporteService: TransporteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transporteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('transporteListModification');
      this.activeModal.close();
    });
  }
}
