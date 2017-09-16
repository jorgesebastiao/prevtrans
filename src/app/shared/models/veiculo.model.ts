import {TipoVeiculo} from './tipoVeiculo.model';

export class Veiculo {

  constructor(public idVeiculo?: number,
              public fabricante?: string,
              public marca?: string,
              public placa?: string,
              public descricao?: string,
              public numeroOcupantes?: number,
              public tipoVeiculo?: TipoVeiculo) {
  }
}
