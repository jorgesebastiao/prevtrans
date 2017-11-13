export class Localizacao {

  constructor ( public latitude?: number,
                public longitude?: number,
                public endereco?: string,
                public bairro?: string,
                public cidade?: string,
                public estado?: string,
                public pais?: string,
                public cep?: string) {
  }
}
