import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { BussAppWeb2SharedModule } from 'app/shared/shared.module';
import { BussAppWeb2CoreModule } from 'app/core/core.module';
import { BussAppWeb2AppRoutingModule } from './app-routing.module';
import { BussAppWeb2HomeModule } from './home/home.module';
import { BussAppWeb2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    BussAppWeb2SharedModule,
    BussAppWeb2CoreModule,
    BussAppWeb2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    BussAppWeb2EntityModule,
    BussAppWeb2AppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class BussAppWeb2AppModule {}
