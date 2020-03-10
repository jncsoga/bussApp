import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BussAppWeb2TestModule } from '../../../test.module';
import { ServicioComponent } from 'app/entities/servicio/servicio.component';
import { ServicioService } from 'app/entities/servicio/servicio.service';
import { Servicio } from 'app/shared/model/servicio.model';

describe('Component Tests', () => {
  describe('Servicio Management Component', () => {
    let comp: ServicioComponent;
    let fixture: ComponentFixture<ServicioComponent>;
    let service: ServicioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWeb2TestModule],
        declarations: [ServicioComponent]
      })
        .overrideTemplate(ServicioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServicioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServicioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Servicio(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.servicios && comp.servicios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
