import { AuthService } from './../../services/auth.service';
import { iUser } from './../../interfaces/iUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/iLogin';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email() {
    return this.formulario.controls['email'];
  }

  get password() {
    return this.formulario.controls['password'];
  }

  submitLogin() {
    const login: ILogin  = this.formulario.value;
    this.authService.findUserByEmail(login.email).subscribe((response: iUser[]) => {
      if(response.length > 0) {
        this.validateLogin(response, login)
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'email ou senha incorreto(s).' });
    })
  }

  validateLogin(users: iUser[], login: ILogin) {
    const userFind = users.find(user => user.password === login.password);

    if(userFind) {
      this.router.navigate(['home']);
      return this.authService.setUserSession(login.email);
    }
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'email ou senha incorreto(s).' });
    return console.log('error');
  }

}
