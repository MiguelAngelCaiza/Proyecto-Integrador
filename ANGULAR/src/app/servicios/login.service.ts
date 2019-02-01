import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {


  constructor(private router: Router) {

  }

  cerrarSesion() {
    localStorage.removeItem("portafolio-doncente");
    this.router.navigate(['/']);
  }

  iniciarSesion(user: any, validation: any) {
    if (validation != 0) {
      localStorage.setItem("portafolio-doncente", JSON.stringify(user));
      this.router.navigate(['/administrador/principal']);
      return true;
    }
    return false;

  }

  verificarCredenciales() {
    if (localStorage.getItem("portafolio-doncente") === null) {
      this.router.navigate(['/']);
    }
  }

  obtenerDatos() {
    return localStorage.getItem("portafolio-doncente");
  }


}

