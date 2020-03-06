import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransporte } from 'app/shared/model/transporte.model';

@Component({
  selector: 'jhi-transporte-detail',
  templateUrl: './transporte-detail.component.html'
})
export class TransporteDetailComponent implements OnInit {
  transporte: ITransporte | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transporte }) => (this.transporte = transporte));
  }

  previousState(): void {
    window.history.back();
  }
}
