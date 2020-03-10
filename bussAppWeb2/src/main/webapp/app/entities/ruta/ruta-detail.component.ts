import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRuta } from 'app/shared/model/ruta.model';

@Component({
  selector: 'jhi-ruta-detail',
  templateUrl: './ruta-detail.component.html'
})
export class RutaDetailComponent implements OnInit {
  ruta: IRuta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ruta }) => (this.ruta = ruta));
  }

  previousState(): void {
    window.history.back();
  }
}
