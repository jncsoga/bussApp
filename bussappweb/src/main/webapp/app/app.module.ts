import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { BussappwebSharedModule } from 'app/shared/shared.module';
import { BussappwebCoreModule } from 'app/core/core.module';
import { BussappwebAppRoutingModule } from './app-routing.module';
import { BussappwebHomeModule } from './home/home.module';
import { BussappwebEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    BussappwebSharedModule,
    BussappwebCoreModule,
    BussappwebHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    BussappwebEntityModule,
    BussappwebAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class BussappwebAppModule {}
