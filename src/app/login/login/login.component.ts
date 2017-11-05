import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/seguranca/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private formBuilder: FormBuilder,
              private router: Router
  ) {
  }

  loginForm: FormGroup;
  erro: string;

  ngOnInit() {
    this.inicializaloginForm();
  }

  login() {
    this.auth.login(this.loginForm.get('usuario').value, this.loginForm.get('senha').value).then(
      () => {
        this.loginForm.patchValue({
          senha: ''
        });
        this.router.navigate(['/admin']);
      }
    ).catch(erro => {
        this.loginForm.patchValue({
          senha: ''
        });
        this.erro = erro;
      });
  }

  valida() {
    return !!this.erro;
  }

  inicializaloginForm() {
    this.loginForm = this.formBuilder.group({
      usuario: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    });
  }
}
