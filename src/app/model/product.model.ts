export  interface Product{
  id:string;
  name:string;
  price:number;
  promotion:boolean;
}
//pagination
export  interface pageProduct{
  products:Product[];
  page:number;
  size:number;
  totalPages:number;
}
