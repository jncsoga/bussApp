import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BussAppWeb2TestModule } from '../../../test.module';
import { TransporteComponent } from 'app/entities/transporte/transporte.component';
import { TransporteService } from 'app/entities/transporte/transporte.service';
import { Transporte } from 'app/shared/model/transporte.model';

describe('Component Tests', () => {
  describe('Transporte Management Component', () => {
    let comp: TransporteComponent;
    let fixture: ComponentFixture<TransporteComponent>;
    let service: TransporteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWeb2TestModule],
        declarations: [TransporteComponent]
      })
        .overrideTemplate(TransporteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransporteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransporteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Transporte(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transportes && comp.transportes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
