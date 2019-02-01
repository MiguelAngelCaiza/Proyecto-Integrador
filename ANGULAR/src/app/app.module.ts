import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './administrador/inicio/inicio.component';
import { ApiService } from './servicios/api.service';
import { LoginService } from './servicios/login.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { PrincipalComponent } from './administrador/principal/principal.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CaratulaComponent } from './administrador/caratula/caratula.component';
import { SilaboComponent } from './administrador/silabo/silabo.component';
import { PlanComponent } from './administrador/plan/plan.component';
import { TemasComponent } from './administrador/temas/temas.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NgxEditorModule } from 'ngx-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PrincipalComponent,
    CaratulaComponent,
    SilaboComponent,
    PlanComponent,
    TemasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxEditorModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      { path: "", component: InicioComponent, pathMatch: "full" },
      { path: "administrador/principal", component: PrincipalComponent },
      { path: "administrador/caratula", component: CaratulaComponent },
      { path: "administrador/silabo", component: SilaboComponent },
      { path: "administrador/plan", component: PlanComponent },
      { path: "administrador/temas", component: TemasComponent },
    ]),
    DropDownsModule,
    InputsModule
  ],
  providers: [ApiService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
