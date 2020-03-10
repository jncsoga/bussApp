import { Moment } from 'moment';

export interface IRuta {
  id?: number;
  lugaresDisponibles?: number;
  inicio?: Moment;
}

export class Ruta implements IRuta {
  constructor(public id?: number, public lugaresDisponibles?: number, public inicio?: Moment) {}
}
