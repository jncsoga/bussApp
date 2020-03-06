import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BussAppWebTestModule } from '../../../test.module';
import { TransporteUpdateComponent } from 'app/entities/transporte/transporte-update.component';
import { TransporteService } from 'app/entities/transporte/transporte.service';
import { Transporte } from 'app/shared/model/transporte.model';

describe('Component Tests', () => {
  describe('Transporte Management Update Component', () => {
    let comp: TransporteUpdateComponent;
    let fixture: ComponentFixture<TransporteUpdateComponent>;
    let service: TransporteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWebTestModule],
        declarations: [TransporteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TransporteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransporteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransporteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transporte(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transporte();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
