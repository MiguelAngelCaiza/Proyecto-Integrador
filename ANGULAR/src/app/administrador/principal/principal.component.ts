import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


interface Instituto {
  nombre: string,
  idInstituto: number
}

interface Carrera {
  nombre: string,
  idCarrera: number
}

interface Asignatura {
  nombre: string,
  idAsignatura: number
}
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  datosProfesor;

  public listInstitutos: Array<Instituto> = [
    { nombre: "INSTITUTO TECNOLOGICO SUPERIOR BENITO JUAREZ", idInstituto: 1 }
  ];

  instituto;

  public listCarreras: Array<Carrera> = [
    { nombre: "DESARROLLO DE SOFTWARE", idCarrera: 1 }
  ];

  carrera;

  public listAsignaturas: Array<Asignatura> = [
    { nombre: "INGENIERIA DEL SOFTWARE", idAsignatura: 2 },
    { nombre: "TENDENCIAS ACTUALES DE PROGRAMACIÓN", idAsignatura: 3 }
  ];

  asignatura;

  constructor(public validar: LoginService, public api: ApiService, public router: Router, public toastr: ToastrManager) {
    this.datosProfesor = JSON.parse(this.validar.obtenerDatos());
   }

  ngOnInit() {
    localStorage.removeItem("silabo");
    localStorage.removeItem("planClase");
    localStorage.removeItem("temas");
    localStorage.removeItem("caratula");
  }

  public caratula(){

    if (this.asignatura == undefined) {
      this.toastr.errorToastr('¡Error!', 'Seleccionar una Asignatura', { position: 'bottom-center' });
    } else {
      localStorage.setItem("caratula", JSON.stringify(this.asignatura));
      this.router.navigate(['/administrador/caratula']);
    }

  }

  public silabo(){

    if (this.instituto == undefined || this.carrera == undefined || this.asignatura == undefined) {
      this.toastr.errorToastr('¡Error!', 'Seleccionar INSTITUTO | CARRERRA | ASIGNATURA', { position: 'bottom-center' });
    } else {
      localStorage.setItem("silabo", JSON.stringify({instituto: this.instituto.nombre, carrera: this.carrera.nombre, asignatura: this.asignatura.nombre}));
      this.router.navigate(['/administrador/silabo']);
    }

  }

  public planClase(){

    if (this.instituto == undefined || this.carrera == undefined || this.asignatura == undefined) {
      this.toastr.errorToastr('¡Error!', 'Seleccionar INSTITUTO | CARRERRA | ASIGNATURA', { position: 'bottom-center' });
    } else {
      localStorage.setItem("planClase", JSON.stringify({instituto: this.instituto.nombre, carrera: this.carrera.nombre, asignatura: this.asignatura.nombre}));
      this.router.navigate(['/administrador/plan']);
    }
  }

  public temas(){
    if (this.instituto == undefined || this.carrera == undefined || this.asignatura == undefined) {
      this.toastr.errorToastr('¡Error!', 'Seleccionar INSTITUTO | CARRERRA | ASIGNATURA', { position: 'bottom-center' });
    } else {
      localStorage.setItem("temas", JSON.stringify({instituto: this.instituto.nombre, carrera: this.carrera.nombre, asignatura: this.asignatura.nombre}));
      this.router.navigate(['/administrador/temas']);
    }
  }

}
