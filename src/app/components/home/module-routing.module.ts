import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { TopbarComponent } from "src/app/layout/topbar/topbar.component";

const routes = [
  {
    path: '',
    componet: HomeComponent
  },
  {
    path: '',
    componet: TopbarComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    BrowserModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
