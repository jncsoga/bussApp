import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';
import { RutaDeleteDialogComponent } from './ruta-delete-dialog.component';

@Component({
  selector: 'jhi-ruta',
  templateUrl: './ruta.component.html'
})
export class RutaComponent implements OnInit, OnDestroy {
  rutas?: IRuta[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected rutaService: RutaService,
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
      this.rutaService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IRuta[]>) => (this.rutas = res.body || []));
      return;
    }

    this.rutaService.query().subscribe((res: HttpResponse<IRuta[]>) => (this.rutas = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRutas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRuta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRutas(): void {
    this.eventSubscriber = this.eventManager.subscribe('rutaListModification', () => this.loadAll());
  }

  delete(ruta: IRuta): void {
    const modalRef = this.modalService.open(RutaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ruta = ruta;
  }
}
