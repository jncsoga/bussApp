import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServicio, Servicio } from 'app/shared/model/servicio.model';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'jhi-servicio-update',
  templateUrl: './servicio-update.component.html'
})
export class ServicioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fecha: [],
    lugares: []
  });

  constructor(protected servicioService: ServicioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ servicio }) => {
      if (!servicio.id) {
        const today = moment().startOf('day');
        servicio.fecha = today;
      }

      this.updateForm(servicio);
    });
  }

  updateForm(servicio: IServicio): void {
    this.editForm.patchValue({
      id: servicio.id,
      fecha: servicio.fecha ? servicio.fecha.format(DATE_TIME_FORMAT) : null,
      lugares: servicio.lugares
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const servicio = this.createFromForm();
    if (servicio.id !== undefined) {
      this.subscribeToSaveResponse(this.servicioService.update(servicio));
    } else {
      this.subscribeToSaveResponse(this.servicioService.create(servicio));
    }
  }

  private createFromForm(): IServicio {
    return {
      ...new Servicio(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      lugares: this.editForm.get(['lugares'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServicio>>): void {
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
