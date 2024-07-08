import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { homeAuthGuard } from "src/app/guards/homeAuth.guard";
import { ProdutoComponent } from "./produto/produto.component";

const routes = [
  {
    path: '',
    componet: HomeComponent,
    canActivate: [homeAuthGuard],
    children: [
      {
        path: '',
        component: ProdutoComponent
      },
      {
          path: 'categoria',
          component: CategoriaComponent,
      },
      {
        path: 'produto',
        component: ProdutoComponent
      }
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
