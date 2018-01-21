import {Component, OnInit, Input, ContentChild, AfterContentInit} from '@angular/core';
import {NgModel, FormControlName} from '@angular/forms'

@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() errorMessage: string[];

  input: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // this.input = this.model || this.control;
    this.input = this.control;
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName');
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
      && (!this.input.hasError('required') || !this.input.hasError('pattern'));
  }

  hasRequired() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('required') && !this.input.hasError('cnpjInvalido');
  }

  hasParttern() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('pattern');
  }

  hasCnpjInvalido() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('cnpjInvalido');
  }

  hasCnpjEmUso() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('cnpjEmUso');
  }

  hasEmailEmUso() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('emailEmUso');
  }

  hasUsuarioEmUso() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('usuarioEmUso');
  }

  hasMinLenght() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('minlength');
  }

  hasMaxLength() {
    return this.input.invalid && (this.input.dirty || this.input.touched) && this.input.hasError('maxlength');
  }
}
