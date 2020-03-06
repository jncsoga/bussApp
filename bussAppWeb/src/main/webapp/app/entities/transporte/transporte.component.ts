import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  currentSearch: string;

  constructor(
    protected transporteService: TransporteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.transporteService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ITransporte[]>) => (this.transportes = res.body || []));
      return;
    }

    this.transporteService.query().subscribe((res: HttpResponse<ITransporte[]>) => (this.transportes = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
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
