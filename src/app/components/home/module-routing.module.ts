import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { CategoriaComponent } from "./categoria/categoria.component";
import { homeAuthGuard } from "src/app/guards/homeAuth.guard";

const routes = [
  {
    path: '',
    componet: HomeComponent,
    canActivate: [homeAuthGuard],
    children: [
      {
          path: 'categoria',
          component: CategoriaComponent,
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
