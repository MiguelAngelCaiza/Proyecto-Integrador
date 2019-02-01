import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-silabo',
  templateUrl: './silabo.component.html',
  styleUrls: ['./silabo.component.css']
})
export class SilaboComponent implements OnInit {
  datosProfesor;
  datosPrincipal;
  config = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "0",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "imageEndPoint": "",
    "toolbar": [
        ["orderedList", "unorderedList"]
    ]
  }

  instituto = "";
  carrera = "";
  asignatura= "";
  docente= "";

  //UNIDADES DE COMPETENCIA
  listaUnidadesCompetencia: any;
  unidadesCompetencia: any;

  numeroUnidadesCompetencia = "";
  descripcionUnidadesCompetencia = "";

  //ELEMENTOS COMPETENCIA
  listaElementosCompetencia: any;
  elementosCompetencia: any;

  numeroElementosCompetencia = "";
  descripcionElementosCompetencia = "";

  //RESULTADO APRENDIZAJE
  listaResultadosAprendizaje: any;
  resultadosAprendizaje: any;

  numeroResultadosAprendizaje = "";
  descripcionResultadosAprendizaje = "";

  //ESTRATEGIAS
  lstEstrategias: any;
  estrategias: any;

  descripcionEstrategia = "";

  //RECURSOS DIDACTICOS
  lstRecursosDidacticos: any;
  recursosDidacticos: any;

  descripcionRecursoDidactico = "";

  //SILABO

  periodoLectivo= "";
  descripcionAsignatura= "";
  objetivo= "";
  //unidadesCompetencia
  //elementosCompetencia
  //resultadosAprendizaje
  semana= "";
  horaClase= "";
  trabajoPractico= "";
  actividadesAutonomas= "";
  observacion= "";
  //estrategias= "";
  //recursosDidacticos= "";


  constructor(public validar: LoginService, public api: ApiService, public router: Router, public toastr: ToastrManager) {
    this.datosProfesor = JSON.parse(this.validar.obtenerDatos());

    this.datosPrincipal = JSON.parse(localStorage.getItem("silabo"));

    this.instituto = this.datosPrincipal.instituto;
    this.carrera = this.datosPrincipal.carrera;
    this.asignatura = this.datosPrincipal.asignatura;

    this.docente= this.datosProfesor.nombre.toUpperCase();
   }


  ngOnInit() {
    this.listarUnidadCompetencia();
    this.listarElementosCompetencia();
    this.listarResultadosAprendizaje();
    this.listarEstrategias();
    this.listarRecursosDidacticos();
  }

  guardarSilabo(){
    console.log(    {
      instituto: this.instituto,
      asignatura: this.asignatura,
      docente: this.docente,
      periodoLectivo: this.periodoLectivo,
      descripcionAsignatura: this.descripcionAsignatura,
      objetivo: this.objetivo,
      idUnidadesCompetencia: this.unidadesCompetencia,
      idElementosCompetencia: this.elementosCompetencia,
      idResultadosAprendizaje: this.resultadosAprendizaje,
      numeroSemana: this.semana,
      horaClase: this.horaClase,
      trabajoPractico: this.trabajoPractico,
      actividadesAutonomas: this.actividadesAutonomas,
      observaciones: this.observacion,
      idEstrategias: this.estrategias,
      idRecursosDidacticos: this.recursosDidacticos
    });
    this.api.post("agregarSilabo",
    {
      instituto: this.instituto,
      asignatura: this.asignatura,
      docente: this.docente,
      periodoLectivo: this.periodoLectivo,
      descripcionAsignatura: this.descripcionAsignatura,
      objetivo: this.objetivo,
      idUnidadesCompetencia: this.unidadesCompetencia,
      idElementosCompetencia: this.elementosCompetencia,
      idResultadosAprendizaje: this.resultadosAprendizaje,
      numeroSemana: this.semana,
      horaClase: this.horaClase,
      trabajoPractico: this.trabajoPractico,
      actividadesAutonomas: this.actividadesAutonomas,
      observaciones: this.observacion,
      idEstrategias: this.estrategias,
      idRecursosDidacticos: this.recursosDidacticos
    }
    ).subscribe(
      (res: any) => {

        this.toastr.successToastr('¡Exito!', 'Resultado de Aprendizaje Registrada Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  guardarEstrategia(){
    this.api.post("agregarEstrategia", {descripcion: this.descripcionEstrategia}).subscribe(
      (res: any) => {
        this.listarEstrategias();
        this.toastr.successToastr('¡Exito!', 'Resultado de Aprendizaje Registrada Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  listarEstrategias(){
    this.api.get("listarEstrategias").subscribe(
      (res: any) => {
        this.lstEstrategias = res;
      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  guardarRecursoDidactico(){
    this.api.post("agregarRecursosDidacticos", {descripcion: this.descripcionRecursoDidactico}).subscribe(
      (res: any) => {
        this.listarRecursosDidacticos();
        this.toastr.successToastr('¡Exito!', 'Resultado de Aprendizaje Registrada Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  listarRecursosDidacticos(){
    this.api.get("listarRecursosDidacticos").subscribe(
      (res: any) => {
        this.lstRecursosDidacticos = res;
      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  guardarResultadosAprendizaje(){
    this.api.post("agregarResultadoAprendizaje", {numero: this.numeroResultadosAprendizaje, descripcion: this.descripcionResultadosAprendizaje}).subscribe(
      (res: any) => {
        this.listarResultadosAprendizaje();
        this.toastr.successToastr('¡Exito!', 'Resultado de Aprendizaje Registrada Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  listarResultadosAprendizaje(){
    this.api.get("listarResultadosAprendizaje").subscribe(
      (res: any) => {
        this.listaResultadosAprendizaje = res;
      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  guardarElementosCompetencia(){
    this.api.post("agregarElementosCompetencia", {numero: this.numeroElementosCompetencia, descripcion: this.descripcionElementosCompetencia}).subscribe(
      (res: any) => {
        this.listarElementosCompetencia();
        this.toastr.successToastr('¡Exito!', 'Elemento de Competencia Registrada Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  listarElementosCompetencia(){
    this.api.get("listarElementosCompetencias").subscribe(
      (res: any) => {
        this.listaElementosCompetencia = res;
      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  guardarUnidadCompetencia(){
    this.api.post("agregarUnidadCompetencia", {numero: this.numeroUnidadesCompetencia, descripcion: this.descripcionUnidadesCompetencia}).subscribe(
      (res: any) => {
        this.listarUnidadCompetencia();
        this.toastr.successToastr('¡Exito!', 'Unidad de Competencia Registrada Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  listarUnidadCompetencia(){
    this.api.get("listarUnidadeCompetencias").subscribe(
      (res: any) => {
        this.listaUnidadesCompetencia = res;
      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  regresar(){
    this.router.navigate(['/administrador/principal']);
  }

}
