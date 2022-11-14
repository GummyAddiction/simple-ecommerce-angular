import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Product } from '../model/product';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private baseUrl = 'http://localhost:8080';
  private username = 'kresna';
  private password = 'kresna';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    }),
  };

  constructor(private httpClient: HttpClient) {}

  //Get All REST
  getAllProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`${this.baseUrl}/product/list`)
      .pipe(catchError(this.errorHandler));
  }

  getAllCategory(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(`${this.baseUrl}/category/list`)
      .pipe(catchError(this.errorHandler));
  }

  //Get by Id REST
  getProductById(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(`${this.baseUrl}/product/detail/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient
      .get<Category>(`${this.baseUrl}/category/detail/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //add REST
  addProduct(product: Product): Observable<Product> {
    return this.httpClient
      .post<Product>(
        `${this.baseUrl}/product/create`,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient
      .post<Category>(
        `${this.baseUrl}/category/create`,
        JSON.stringify(category),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Update REST
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient
      .put<Product>(
        `${this.baseUrl}/product/update`,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient
      .put<Category>(
        `${this.baseUrl}/category/update`,
        JSON.stringify(category),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Delete REST
  deleteProduct(id: number) {
    return this.httpClient
      .delete<Product>(`${this.baseUrl}/product/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteCategory(id: number) {
    return this.httpClient
      .delete<Category>(
        `${this.baseUrl}/category/delete/${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  // Handling error
  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
