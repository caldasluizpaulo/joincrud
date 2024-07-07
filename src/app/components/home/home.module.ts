import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';

import { HomeComponent } from "./home.component";
import { TopbarComponent } from "src/app/layout/topbar/topbar.component";
import { FooterComponent } from "src/app/layout/footer/footer.component";
import { AppMenuitemComponent } from "src/app/layout/app.menuitem.component";
import { RouterModule } from "@angular/router";
import { CategoriaComponent } from "./categoria/categoria.component";
import { HomeRoutingModule } from "./module-routing.module";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    FooterComponent,
    AppMenuitemComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    FormsModule,
    HttpClientModule,

    DialogModule,
    TableModule,
    RippleModule,
    ToolbarModule,
    RatingModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    InputTextModule
  ],
  exports: [
    HomeComponent,
    TopbarComponent,
    FooterComponent,
    AppMenuitemComponent,
    CategoriaComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class HomeModule { }
