import { Moment } from 'moment';

export interface IServicio {
  id?: number;
  fecha?: Moment;
  lugares?: number;
}

export class Servicio implements IServicio {
  constructor(public id?: number, public fecha?: Moment, public lugares?: number) {}
}
