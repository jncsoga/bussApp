import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChofer } from 'app/shared/model/chofer.model';
import { ChoferService } from './chofer.service';
import { ChoferDeleteDialogComponent } from './chofer-delete-dialog.component';

@Component({
  selector: 'jhi-chofer',
  templateUrl: './chofer.component.html'
})
export class ChoferComponent implements OnInit, OnDestroy {
  chofers?: IChofer[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected choferService: ChoferService,
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
      this.choferService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IChofer[]>) => (this.chofers = res.body || []));
      return;
    }

    this.choferService.query().subscribe((res: HttpResponse<IChofer[]>) => (this.chofers = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChofers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChofer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChofers(): void {
    this.eventSubscriber = this.eventManager.subscribe('choferListModification', () => this.loadAll());
  }

  delete(chofer: IChofer): void {
    const modalRef = this.modalService.open(ChoferDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chofer = chofer;
  }
}
