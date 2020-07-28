export class ProductoModel {
    id: number;
    descripcion: string;
    precio: number;
    costo: number;
    imgUrl: string;
    calorias: number;
    carbs: number;
    fat: number;
    proteins: number;
    constructor(){
      this.id = 0;
      this.descripcion = null;
      this.imgUrl = null;
      this.precio = 0;
      this.costo = 0;
      this.calorias = 0;
      this.carbs = 0;
      this.proteins = 0;
      this.fat = 0;
    }
}
