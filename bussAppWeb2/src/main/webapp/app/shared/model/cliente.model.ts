export interface ICliente {
  id?: number;
  usuario?: number;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public usuario?: number) {}
}
