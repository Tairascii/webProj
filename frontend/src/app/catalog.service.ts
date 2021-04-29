import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category, Product, SubCategory, Comment, AuthToken} from './models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  BASE_URL = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.BASE_URL}/api/categories/`);
  }
  getSubCategories(catId: number): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`${this.BASE_URL}/api/subcategories/${catId}`);
  }
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}/api/products/`);
  }
  getProductDetail(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.BASE_URL}/api/products/${id}`);
  }
  getComments(id: string): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.BASE_URL}/api/products/${id}/comments/`);
  }
  login(username: string, password: string): Observable<AuthToken>{
    return this.http.post<AuthToken>(`${this.BASE_URL}/api/login/`, {
      username,
      password
    });
  }
  createComment(id: string, comment: Comment): Observable<any>{
    return this.http.post(`${this.BASE_URL}/api/products/${id}/comments/`, comment);
  }
  updateComment(id: string, comment: Comment): Observable<any>{
    return this.http.put(`${this.BASE_URL}/api/products/${id}/comments/${comment.id}`, comment);
  }
  deleteComment(id: string, commentId: number): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/api/products/${id}/comments/${commentId}`);
  }

}
