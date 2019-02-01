import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-caratula',
  templateUrl: './caratula.component.html',
  styleUrls: ['./caratula.component.css']
})
export class CaratulaComponent implements OnInit {

  datosProfesor;
  datosAsignatura;

  instituto= "INSTITUTO TECNOLOGICO SUPERIOR BENITO JUAREZ";
  asignatura= "";
  docente= "";
  periodoAcedemico= "";
  periodoLectivo = "";

  constructor(public validar: LoginService, public api: ApiService, public router: Router, public toastr: ToastrManager) {
    this.datosProfesor = JSON.parse(this.validar.obtenerDatos());
    this.datosAsignatura = JSON.parse(localStorage.getItem("caratula"));
      this.asignatura = this.datosAsignatura.nombre;
      this.docente= this.datosProfesor.nombre.toUpperCase();
   }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['/administrador/principal']);
  }

  guardar(){
    this.api.post("agregarCaratula", {instituto: this.instituto, asignatura:this.asignatura, docente:this.docente, periodoAcedemico: this.periodoAcedemico, periodoLectivo:this.periodoLectivo}).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.successToastr('¡Exito!', 'Carátula Registrada Correctamente', { position: 'bottom-center' });

      },
      err => {
        console.log(err);
        this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
      }
    );
  }

}
