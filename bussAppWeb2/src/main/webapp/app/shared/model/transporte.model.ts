export interface ITransporte {
  id?: number;
  lugares?: number;
  marca?: string;
  subMarca?: string;
  noSerie?: string;
  placas?: string;
}

export class Transporte implements ITransporte {
  constructor(
    public id?: number,
    public lugares?: number,
    public marca?: string,
    public subMarca?: string,
    public noSerie?: string,
    public placas?: string
  ) {}
}
