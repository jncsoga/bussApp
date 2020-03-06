import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';

@Component({
  templateUrl: './ruta-delete-dialog.component.html'
})
export class RutaDeleteDialogComponent {
  ruta?: IRuta;

  constructor(protected rutaService: RutaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rutaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rutaListModification');
      this.activeModal.close();
    });
  }
}
