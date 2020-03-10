import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BussAppWeb2TestModule } from '../../../test.module';
import { RutaDetailComponent } from 'app/entities/ruta/ruta-detail.component';
import { Ruta } from 'app/shared/model/ruta.model';

describe('Component Tests', () => {
  describe('Ruta Management Detail Component', () => {
    let comp: RutaDetailComponent;
    let fixture: ComponentFixture<RutaDetailComponent>;
    const route = ({ data: of({ ruta: new Ruta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWeb2TestModule],
        declarations: [RutaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RutaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RutaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ruta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ruta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
