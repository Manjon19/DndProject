import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User;
  userName: string;
  pass: string;
  pass2: string;
  userValid: boolean;
  passValid: boolean;
  passCheck: boolean;
  constructor(private myRoot: Router, private SAuthentication: AuthServiceService) {
    this.user = {
      userName: "",
      pass: ""
    }
    this.userValid = true;
    this.passValid = true;
    this.passCheck = true;
    this.userName = "";
    this.pass = "";
    this.pass2 = "";
  }
  register() {
    //Validacion de formulario
    let regExUser = new RegExp("^[a-zA-Z0-9]+$");
    if (!regExUser.test(this.userName)) {
      this.userValid = false;

    } else {
      this.userValid = true;
      if (this.pass.trim() != '') {
        if (this.pass.length < 8) {
          this.passValid = false;
        } else {
          this.passValid = true;
          if (this.pass !== this.pass2) {
            this.passCheck = false
          } else {
            this.passCheck = true;
          }
        }


      } else {
        this.passValid = false;
      }
    }


    if (this.passCheck == true && this.passValid == true && this.userValid == true) {
      this.user = {
        userName: this.userName,
        pass: this.pass
      }
      this.SAuthentication.setUser(this.user);
      alert("Usuario registrado correctamente");
      this.myRoot.navigate(["login"]);
    }



  }
}
