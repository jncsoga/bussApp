import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BussAppWebTestModule } from '../../../test.module';
import { RutaUpdateComponent } from 'app/entities/ruta/ruta-update.component';
import { RutaService } from 'app/entities/ruta/ruta.service';
import { Ruta } from 'app/shared/model/ruta.model';

describe('Component Tests', () => {
  describe('Ruta Management Update Component', () => {
    let comp: RutaUpdateComponent;
    let fixture: ComponentFixture<RutaUpdateComponent>;
    let service: RutaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWebTestModule],
        declarations: [RutaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RutaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RutaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RutaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ruta(123);
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
        const entity = new Ruta();
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
