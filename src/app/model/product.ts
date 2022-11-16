export interface Product {
  id: number;
  category_id: number;
  name: string;
  image: string;
  price: number;
  description: number;
}

export class ProductModel {

  id!: number
  category_id!: number
  name!: string
  image!: string
  price!: number
  description!: number
  categoryName!: string

  constructor(
  id: number,
  category_id: number,
  name: string,
  image: string,
  price: number,
  description: number,
  categoryName : string
  )
  {}


  setCategoryName(name:string):void{
    this.categoryName = name;
  }
}
