import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstacion } from 'app/shared/model/estacion.model';
import { EstacionService } from './estacion.service';

@Component({
  templateUrl: './estacion-delete-dialog.component.html'
})
export class EstacionDeleteDialogComponent {
  estacion?: IEstacion;

  constructor(protected estacionService: EstacionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estacionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('estacionListModification');
      this.activeModal.close();
    });
  }
}
