import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEstacion, Estacion } from 'app/shared/model/estacion.model';
import { EstacionService } from './estacion.service';

@Component({
  selector: 'jhi-estacion-update',
  templateUrl: './estacion-update.component.html'
})
export class EstacionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    geolocalizacion: [],
    nombre: []
  });

  constructor(protected estacionService: EstacionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estacion }) => {
      this.updateForm(estacion);
    });
  }

  updateForm(estacion: IEstacion): void {
    this.editForm.patchValue({
      id: estacion.id,
      geolocalizacion: estacion.geolocalizacion,
      nombre: estacion.nombre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estacion = this.createFromForm();
    if (estacion.id !== undefined) {
      this.subscribeToSaveResponse(this.estacionService.update(estacion));
    } else {
      this.subscribeToSaveResponse(this.estacionService.create(estacion));
    }
  }

  private createFromForm(): IEstacion {
    return {
      ...new Estacion(),
      id: this.editForm.get(['id'])!.value,
      geolocalizacion: this.editForm.get(['geolocalizacion'])!.value,
      nombre: this.editForm.get(['nombre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstacion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
