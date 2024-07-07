import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { HomeComponent } from "./home.component";
import { TopbarComponent } from "src/app/layout/topbar/topbar.component";
import { FooterComponent } from "src/app/layout/footer/footer.component";
import { AppMenuitemComponent } from "src/app/layout/app.menuitem.component";


@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    FooterComponent,
    AppMenuitemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    TopbarComponent,
    FooterComponent,
    AppMenuitemComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class HomeModule { }
