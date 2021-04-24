export interface Category{
  id: number;
  name: string;
}
export interface SubCategory{
  id: number;
  name: string;
  cat: number;
}
export interface Product{
  id: number;
  name: string;
  cat: number;
  subcat: number;
  image: string;
  description: string;
  rating: number;
  price: number;
  quantity: number;
}

export class Comment{
  static num = 0;
  id: number;
  userName: string;
  productId: number;
  public comment: string;
  public date: string;
  constructor(userName: string, productId: number, comment: string) {
    this.id = Comment.num++;
    this.userName = userName;
    this.productId = productId;
    this.comment = comment;
    this.date = '2021-4-19 19:54:10';
  }
  setDate(date: string): void{
    this.date = date;
  }
}

export interface User{
  id: number;
  name: string;
  password: string;
  status: boolean;
}
