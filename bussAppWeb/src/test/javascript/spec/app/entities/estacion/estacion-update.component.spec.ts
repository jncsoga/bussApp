import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BussAppWebTestModule } from '../../../test.module';
import { EstacionUpdateComponent } from 'app/entities/estacion/estacion-update.component';
import { EstacionService } from 'app/entities/estacion/estacion.service';
import { Estacion } from 'app/shared/model/estacion.model';

describe('Component Tests', () => {
  describe('Estacion Management Update Component', () => {
    let comp: EstacionUpdateComponent;
    let fixture: ComponentFixture<EstacionUpdateComponent>;
    let service: EstacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWebTestModule],
        declarations: [EstacionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstacionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstacionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Estacion(123);
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
        const entity = new Estacion();
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
