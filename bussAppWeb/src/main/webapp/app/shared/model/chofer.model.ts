export interface IChofer {
  id?: number;
  usuario?: number;
}

export class Chofer implements IChofer {
  constructor(public id?: number, public usuario?: number) {}
}
