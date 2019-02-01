import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

interface PlanClase {
  descripcion: string,
  idPlanClase: number
}

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  datosProfesor;
  datosPrincipal;

  public listaParelelos: Array<string> = [ "A", "B", "C" ];
  public listaCumplimiento: Array<string> = [ "SI", "NO", "PARCIAL" ];
  public listaEstado: Array<string> = [ "SI", "NO"];

  public listaMeses: Array<{ valor: number, nombre: string }> = [
    { valor: 1, nombre: "ENERO" },
    { valor: 2, nombre: "FEBRERO" },
    { valor: 3, nombre: "MARZO" },
    { valor: 4, nombre: "ABRIL" },
    { valor: 5, nombre: "MAYO" },
    { valor: 6, nombre: "JUNIO" },
    { valor: 7, nombre: "JULIO" },
    { valor: 8, nombre: "AGOSTO" },
    { valor: 9, nombre: "SEPTIEMBRE" },
    { valor: 10, nombre: "OCTUBRE" },
    { valor: 11, nombre: "NOVIEMBRE" },
    { valor: 12, nombre: "DICIEMBRE" },
  ];
  public listInstitutos: Array<PlanClase> = [
    { idPlanClase: 1, descripcion: "PLAN CLASE N°1 TEMAS: POO" },
    { idPlanClase: 2, descripcion: "PLAN CLASE N°2 TEMAS: PROGRAMACIÓN" },
  ];

  //DATOS
  instituto = "";
  carrera = "";
  asignatura= "";
  periodoAcademico= "";
  periodoLectivo = "";
  modalidad= "";
  docente= "";
  paralelo = "A";

  //REGISTRO

  mes: number = this.mesActual();
  semana: number = this.semanaActual();
  tema = "";
  hora = "";
  cumplimiento: string = "SI";
  planClase: number = 1;
  estado: any;
  idTemasDatos:any;

  constructor(public validar: LoginService, public api: ApiService, public router: Router, public toastr: ToastrManager) {
    this.datosProfesor = JSON.parse(this.validar.obtenerDatos());

    this.datosPrincipal = JSON.parse(localStorage.getItem("temas"));

    this.instituto = this.datosPrincipal.instituto;
    this.carrera = this.datosPrincipal.carrera;
    this.asignatura = this.datosPrincipal.asignatura;

    this.docente= this.datosProfesor.nombre.toUpperCase();
   }

  ngOnInit() {

  }

  mesActual(){
    var actual = new Date();
    var mm = actual.getMonth()+1;
    return mm;
  }

  semanaActual(){
    var now=new Date(),i=0,f,sem=(new Date(now.getFullYear(), 0,1).getDay()>0)?1:0;
    while( (f=new Date(now.getFullYear(), 0, ++i)) < now ){
      if(!f.getDay()){
        sem++;
      }
    }
    return sem;
  }


  regresar(){
    this.router.navigate(['/administrador/principal']);
  }

  guardarTemasDatos(){
    this.api.post("agregarTemasDatos", {instituto: this.instituto, carrera: this.carrera, asignatura: this.asignatura, periodoAcademico: this.periodoAcademico, periodoLectivo:this.periodoLectivo, modalidad: this.modalidad, docente: this.docente, paralelo: this.paralelo}).subscribe(
      (res: any) => {
        console.log(res);
        this.idTemasDatos = res.id;
        this.toastr.successToastr('¡Exito!', 'Tema Tratado/Datos | Registrado Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

  guardarTemasRegistro(){
    this.api.post("agregarTemasRegistro", {mes: this.mes, semana: this.semana, tema: this.tema, hora: this.hora, cumpliento:this.cumplimiento, idPlanClase: this.planClase, estado: this.estado, idTemasDatos: this.idTemasDatos}).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.successToastr('¡Exito!', 'Tema Tratado/Registro |  Registrado Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

}
