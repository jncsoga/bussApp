export interface IEstacion {
  id?: number;
  geolocalizacion?: string;
  nombre?: string;
}

export class Estacion implements IEstacion {
  constructor(public id?: number, public geolocalizacion?: string, public nombre?: string) {}
}
