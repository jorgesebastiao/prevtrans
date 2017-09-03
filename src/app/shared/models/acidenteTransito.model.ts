import {Veiculo} from './veiculo.model';
import {DadosAcidenteTransito} from './dadosAcidenteTransito.model';
import {Instituicao} from './instituicao.model';

export class AcidenteTransito {
  constructor(public idAcidenteTransito?: string,
              public tituloPublicacao?: string,
              public descricao?: string,
              public latitude?: number,
              public longitude?: number,
              public dataAcidenteTransito?: string,
              public quantidadeVitimas?: number,
              public veiculos?: Veiculo[],
              public dadosAcidenteTransitos?: DadosAcidenteTransito[],
              public instituicao?: Instituicao,
              public  urlFotos?: string) {
  }
}
