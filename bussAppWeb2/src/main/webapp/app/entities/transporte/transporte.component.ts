import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransporte } from 'app/shared/model/transporte.model';
import { TransporteService } from './transporte.service';
import { TransporteDeleteDialogComponent } from './transporte-delete-dialog.component';

@Component({
  selector: 'jhi-transporte',
  templateUrl: './transporte.component.html'
})
export class TransporteComponent implements OnInit, OnDestroy {
  transportes?: ITransporte[];
  eventSubscriber?: Subscription;

  constructor(protected transporteService: TransporteService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.transporteService.query().subscribe((res: HttpResponse<ITransporte[]>) => (this.transportes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransportes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransporte): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransportes(): void {
    this.eventSubscriber = this.eventManager.subscribe('transporteListModification', () => this.loadAll());
  }

  delete(transporte: ITransporte): void {
    const modalRef = this.modalService.open(TransporteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transporte = transporte;
  }
}
