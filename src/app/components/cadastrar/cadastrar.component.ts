import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iUser } from 'src/app/interfaces/iUser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  formCadastro: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCadastro = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  get name() {
    return this.formCadastro.controls['name'];
  }

  get email() {
    return this.formCadastro.controls['email'];
  }

  get password() {
    return this.formCadastro.controls['password'];
  }

  get confirmPassword() {
    return this.formCadastro.controls['confirmPassword'];
  }

  submitCadastrar() {
    const userTyped: iUser = { ...this.formCadastro.value };
    console.log(userTyped);
    this.authService.saveUser(userTyped).subscribe(response => {
      console.log('sucesso', response);

      this.router.navigate(['login']);

    }, error => {
      //TODO
      console.log('erro cadastrar');
    })

  }

}
