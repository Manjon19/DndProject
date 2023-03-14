import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

//Servicio que se encargará de gestionar las sesiones de autenticación.

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // Guardamos los datos de la sesión en memoria
  loggedIn: boolean = false;
  userName: string = "";
  userList!: Array<User>;

  constructor() {
    // Simulación BD con usuarios
    if (localStorage.getItem("userList")) {
      this.userList = JSON.parse(localStorage.getItem("userList")!)
    } else {
      this.userList = [
        { userName: 'elias', pass: '12345678' },
        { userName: 'pepe', pass: 'abcdefgh' },
        { userName: 'maria', pass: '12345678' },
      ];
    }

  }

  login(loginName: string, loginPassword: string) {
    let userObject = this.userList.find(user => user.userName === loginName && user.pass === loginPassword);
    // Comprueba si userObject tiene datos
    if (userObject) {
      this.loggedIn = true;
      // Añado los datos del usuario loggeado en memoria
      this.setUser(userObject);
    }
  }

  logout() {
    this.loggedIn = false;
    alert("Sesión cerrada");
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  // Este método recoge los datos del usuario loggeado de la BD
  // y los guarda en memoria
  setUser(userLogged: User) {
    this.userList.push(userLogged);
    localStorage.setItem("userList", JSON.stringify(this.userList));
    this.userName = userLogged.userName;
  }
  getUser() {
    return this.userName;
  }
}
