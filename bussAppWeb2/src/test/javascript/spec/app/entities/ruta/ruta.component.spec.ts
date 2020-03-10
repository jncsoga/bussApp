import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BussAppWeb2TestModule } from '../../../test.module';
import { RutaComponent } from 'app/entities/ruta/ruta.component';
import { RutaService } from 'app/entities/ruta/ruta.service';
import { Ruta } from 'app/shared/model/ruta.model';

describe('Component Tests', () => {
  describe('Ruta Management Component', () => {
    let comp: RutaComponent;
    let fixture: ComponentFixture<RutaComponent>;
    let service: RutaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWeb2TestModule],
        declarations: [RutaComponent]
      })
        .overrideTemplate(RutaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RutaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RutaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ruta(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rutas && comp.rutas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
