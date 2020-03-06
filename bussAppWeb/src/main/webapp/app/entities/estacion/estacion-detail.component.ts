import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstacion } from 'app/shared/model/estacion.model';

@Component({
  selector: 'jhi-estacion-detail',
  templateUrl: './estacion-detail.component.html'
})
export class EstacionDetailComponent implements OnInit {
  estacion: IEstacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estacion }) => (this.estacion = estacion));
  }

  previousState(): void {
    window.history.back();
  }
}
