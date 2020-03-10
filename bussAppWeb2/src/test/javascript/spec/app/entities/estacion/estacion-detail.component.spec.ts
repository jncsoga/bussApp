import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BussAppWeb2TestModule } from '../../../test.module';
import { EstacionDetailComponent } from 'app/entities/estacion/estacion-detail.component';
import { Estacion } from 'app/shared/model/estacion.model';

describe('Component Tests', () => {
  describe('Estacion Management Detail Component', () => {
    let comp: EstacionDetailComponent;
    let fixture: ComponentFixture<EstacionDetailComponent>;
    const route = ({ data: of({ estacion: new Estacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWeb2TestModule],
        declarations: [EstacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
