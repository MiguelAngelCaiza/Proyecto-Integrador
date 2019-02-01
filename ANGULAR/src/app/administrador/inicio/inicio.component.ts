import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  formularioUsuario: FormGroup;
  datosUsuario = [];

  constructor(public api: ApiService, public formBuilder: FormBuilder, public validar: LoginService, public toastr: ToastrManager) { }

  ngOnInit() {

    this.formularioUsuario = this.formBuilder.group({
      correo: ["", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
      contrasena: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    });
  }



  verificarUsuario(formValue: any) {

    if (this.formularioUsuario.controls.correo.valid == false) {
      this.toastr.errorToastr('¡Error!', 'Ingresar Correo Electrónico Válido', { position: 'bottom-center' });
    } else if (this.formularioUsuario.controls.contrasena.valid == false) {
      this.toastr.errorToastr('¡Error!', 'Ingresar una Contraseña', { position: 'bottom-center' });
    } else {
      this.api.post("iniciarSesion", formValue).subscribe(
        (res: any) => {
          this.datosUsuario =res
          if (this.datosUsuario.length == 0) {
            this.toastr.warningToastr('¡Advertencia!', 'Correo Electrónico y/o Contrasena Incorrecta', { position: 'bottom-center' });
          } else {
            this.formularioUsuario.reset();
            this.validar.iniciarSesion(this.datosUsuario[0], this.datosUsuario[0].idUsuario);
          }
        },
        err => {
          console.log(err);
          this.toastr.errorToastr('¡Error!', 'Error con el servidor de datos', { position: 'bottom-center' });
        }
      );
    }
  }

}
