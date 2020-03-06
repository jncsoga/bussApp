import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BussAppWebTestModule } from '../../../test.module';
import { EstacionComponent } from 'app/entities/estacion/estacion.component';
import { EstacionService } from 'app/entities/estacion/estacion.service';
import { Estacion } from 'app/shared/model/estacion.model';

describe('Component Tests', () => {
  describe('Estacion Management Component', () => {
    let comp: EstacionComponent;
    let fixture: ComponentFixture<EstacionComponent>;
    let service: EstacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWebTestModule],
        declarations: [EstacionComponent]
      })
        .overrideTemplate(EstacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstacionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstacionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Estacion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estacions && comp.estacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
