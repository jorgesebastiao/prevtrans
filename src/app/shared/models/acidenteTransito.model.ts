import {Veiculo} from './veiculo.model';
import {Instituicao} from './instituicao.model';
import {UrlFotos} from './UrlFotos.model';
import {TipoVia} from './tipoVia.model';
import {CondicaoDaVia} from './condicaoDaVia.model';
import {Visibilidade} from './visibilidade.model';
import {Sinalizacao} from './sinalizacao.model';
import {TipoAcidenteTransito} from './tipoAcidenteTransito.model';
import {Pista} from './pista.model';
import {Clima} from './clima.model';
import {PeriodoDia} from './periodoDia.model';

export class AcidenteTransito {
  constructor(public idAcidenteTransito?: string,
              public tituloPublicacao?: string,
              public descricao?: string,
              public latitude?: number,
              public longitude?: number,
              public endereco?: string,
              public bairro?: string,
              public cidade?: string,
              public estado?: string,
              public cep?: string,
              public dataAcidenteTransito?: string,
              public numeroDeVitimas?: number,
              public numeroDeMotos?: number,
              public numeroDeFeridos?: number,
              public clima?: Clima,
              public tipoAcidenteTransito?: TipoAcidenteTransito,
              public pista?: Pista,
              public periodoDia?: PeriodoDia,
              public sinalizacao?: Sinalizacao,
              public visibilidade?: Visibilidade,
              public condicaoDaVia?: CondicaoDaVia,
              public tipoVia?: TipoVia,
              public veiculos?: Veiculo[],
              public instituicao?: Instituicao,
              public  urlFotos?: UrlFotos[]) {
  }
}
