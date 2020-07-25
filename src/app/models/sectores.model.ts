export class SectorModel {
  id: string;
  descripcion: string;
  precio: number;
  ciudadId: string;
}

export class Sectores {
  static Get(): SectorModel[] {
    return [
      {ciudadId:"DN",  id: "DN", descripcion: 'Ensanche Naco', precio: 170},
      {ciudadId:"DN",  id: "DN", descripcion: 'Evaristo Morales', precio: 140},
      {ciudadId:"DN",  id: "DN", descripcion: 'Piantini', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Cacicazgos', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
      {ciudadId:"DN",  id: "DN", descripcion: 'Bella Vista', precio: 150},
    ];  }
}
