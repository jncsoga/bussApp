import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRuta, Ruta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';

@Component({
  selector: 'jhi-ruta-update',
  templateUrl: './ruta-update.component.html'
})
export class RutaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    lugaresDisponibles: [],
    inicio: []
  });

  constructor(protected rutaService: RutaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ruta }) => {
      if (!ruta.id) {
        const today = moment().startOf('day');
        ruta.inicio = today;
      }

      this.updateForm(ruta);
    });
  }

  updateForm(ruta: IRuta): void {
    this.editForm.patchValue({
      id: ruta.id,
      lugaresDisponibles: ruta.lugaresDisponibles,
      inicio: ruta.inicio ? ruta.inicio.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ruta = this.createFromForm();
    if (ruta.id !== undefined) {
      this.subscribeToSaveResponse(this.rutaService.update(ruta));
    } else {
      this.subscribeToSaveResponse(this.rutaService.create(ruta));
    }
  }

  private createFromForm(): IRuta {
    return {
      ...new Ruta(),
      id: this.editForm.get(['id'])!.value,
      lugaresDisponibles: this.editForm.get(['lugaresDisponibles'])!.value,
      inicio: this.editForm.get(['inicio'])!.value ? moment(this.editForm.get(['inicio'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRuta>>): void {
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
