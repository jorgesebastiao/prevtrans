import {Component, EventEmitter, OnInit} from '@angular/core';
import {AcidenteTransito} from '../../../../shared/models/acidenteTransito.model';
import {MaterializeAction} from 'angular2-materialize';
import {AuthService} from '../../../../shared/seguranca/auth.service';
import {AcidenteTransitoService} from '../../../../shared/services';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';
import {ToastyService} from 'ng2-toasty';


@Component({
  selector: 'app-acidentes-de-transitos',
  templateUrl: './acidentes-de-transitos.component.html',
  styleUrls: ['./acidentes-de-transitos.component.css']
})
export class AcidentesDeTransitosComponent implements OnInit {

  buscaAcidenteForm: FormGroup;
  buscaControl: FormControl;
  confirma: boolean = false;
  idAcidenteTransito: string;
  modalActions = new EventEmitter<MaterializeAction>();
  acidentesTransitos: AcidenteTransito[];

  constructor(public auth: AuthService, private formBuilder: FormBuilder,
              private acidenteTransitoService: AcidenteTransitoService,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    this.buscaControl = this.formBuilder.control('');
    this.buscaAcidenteForm = this.formBuilder.group(
      {
        buscaControl: this.buscaControl
      }
    );
    if (this.auth.jwtPayload.id_instituicao === 'PREVTRANS_ADMINISTRACAO') {
      this.buscaControl.valueChanges.debounceTime(500)
        .distinctUntilChanged()
        .switchMap(busca => this.acidenteTransitoService.acidentesTransito(busca))
        .catch(erro => Observable.from([]))
        .subscribe(acidentesTransitos => {
          this.acidentesTransitos = acidentesTransitos;
        });
    } else {
      this.buscaControl.valueChanges.debounceTime(500)
        .distinctUntilChanged()
        .switchMap(busca => this.acidenteTransitoService
          .acidentesTransitoPorInstituicao(this.auth.jwtPayload.id_instituicao, busca))
        .catch(erro => Observable.from([]))
        .subscribe(acidentesTransitos => {
          this.acidentesTransitos = acidentesTransitos;
        });
    }
    this.carregaAcidenteTransito();
  }

  confirmaModal(idAcidenteTransito: string) {
    this.idAcidenteTransito = idAcidenteTransito;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  confirmaExcluir(confirma: boolean) {
    if (confirma && this.idAcidenteTransito) {
      this.acidenteTransitoService.deleteAcidenteTransito(this.idAcidenteTransito).subscribe(
        () => {
          let index = this.acidentesTransitos.findIndex(p => p.idAcidenteTransito === this.idAcidenteTransito);
          this.acidentesTransitos.splice(index, 1);
          this.fechaModal();
        }
      );
    }
  }

  fechaModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  carregaAcidenteTransito() {
    if (this.auth.jwtPayload.id_instituicao === 'PREVTRANS_ADMINISTRACAO') {
      this.acidenteTransitoService.acidentesTransito().subscribe(
        acidentesTransitos => {
          this.acidentesTransitos = acidentesTransitos;
        }
      );
    } else {
      this.acidenteTransitoService.acidentesTransitoPorInstituicao(this.auth.jwtPayload.id_instituicao)
        .subscribe(
          acidentesTransitos => {
            this.acidentesTransitos = acidentesTransitos;
          }
        );
    }
  }
}
