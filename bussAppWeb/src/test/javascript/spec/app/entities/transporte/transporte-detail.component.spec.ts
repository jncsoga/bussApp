import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BussAppWebTestModule } from '../../../test.module';
import { TransporteDetailComponent } from 'app/entities/transporte/transporte-detail.component';
import { Transporte } from 'app/shared/model/transporte.model';

describe('Component Tests', () => {
  describe('Transporte Management Detail Component', () => {
    let comp: TransporteDetailComponent;
    let fixture: ComponentFixture<TransporteDetailComponent>;
    const route = ({ data: of({ transporte: new Transporte(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BussAppWebTestModule],
        declarations: [TransporteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TransporteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransporteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load transporte on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transporte).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
