import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITransporte, Transporte } from 'app/shared/model/transporte.model';
import { TransporteService } from './transporte.service';

@Component({
  selector: 'jhi-transporte-update',
  templateUrl: './transporte-update.component.html'
})
export class TransporteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    lugares: [],
    marca: [],
    subMarca: [],
    noSerie: [],
    placas: []
  });

  constructor(protected transporteService: TransporteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transporte }) => {
      this.updateForm(transporte);
    });
  }

  updateForm(transporte: ITransporte): void {
    this.editForm.patchValue({
      id: transporte.id,
      lugares: transporte.lugares,
      marca: transporte.marca,
      subMarca: transporte.subMarca,
      noSerie: transporte.noSerie,
      placas: transporte.placas
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transporte = this.createFromForm();
    if (transporte.id !== undefined) {
      this.subscribeToSaveResponse(this.transporteService.update(transporte));
    } else {
      this.subscribeToSaveResponse(this.transporteService.create(transporte));
    }
  }

  private createFromForm(): ITransporte {
    return {
      ...new Transporte(),
      id: this.editForm.get(['id'])!.value,
      lugares: this.editForm.get(['lugares'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      subMarca: this.editForm.get(['subMarca'])!.value,
      noSerie: this.editForm.get(['noSerie'])!.value,
      placas: this.editForm.get(['placas'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransporte>>): void {
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
