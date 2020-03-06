import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServicio } from 'app/shared/model/servicio.model';
import { ServicioService } from './servicio.service';
import { ServicioDeleteDialogComponent } from './servicio-delete-dialog.component';

@Component({
  selector: 'jhi-servicio',
  templateUrl: './servicio.component.html'
})
export class ServicioComponent implements OnInit, OnDestroy {
  servicios?: IServicio[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected servicioService: ServicioService,
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
      this.servicioService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IServicio[]>) => (this.servicios = res.body || []));
      return;
    }

    this.servicioService.query().subscribe((res: HttpResponse<IServicio[]>) => (this.servicios = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServicios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServicio): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServicios(): void {
    this.eventSubscriber = this.eventManager.subscribe('servicioListModification', () => this.loadAll());
  }

  delete(servicio: IServicio): void {
    const modalRef = this.modalService.open(ServicioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.servicio = servicio;
  }
}
