import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstacion } from 'app/shared/model/estacion.model';
import { EstacionService } from './estacion.service';
import { EstacionDeleteDialogComponent } from './estacion-delete-dialog.component';

@Component({
  selector: 'jhi-estacion',
  templateUrl: './estacion.component.html'
})
export class EstacionComponent implements OnInit, OnDestroy {
  estacions?: IEstacion[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected estacionService: EstacionService,
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
      this.estacionService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IEstacion[]>) => (this.estacions = res.body || []));
      return;
    }

    this.estacionService.query().subscribe((res: HttpResponse<IEstacion[]>) => (this.estacions = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEstacions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstacion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstacions(): void {
    this.eventSubscriber = this.eventManager.subscribe('estacionListModification', () => this.loadAll());
  }

  delete(estacion: IEstacion): void {
    const modalRef = this.modalService.open(EstacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estacion = estacion;
  }
}
