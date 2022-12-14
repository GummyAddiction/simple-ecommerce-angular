import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Product, ProductModel } from '../model/product';
import { Category } from '../model/category';
import { User } from '../model/user';
import { loginmodel, Role } from '../model/loginmodel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private baseUrl = 'http://localhost:8080';
  private username = 'kresna';
  private password = 'kresna';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('kresna:kresna'),
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  //Get All REST
  getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient
      .get<ProductModel[]>(`${this.baseUrl}/product/list`)
      .pipe(catchError(this.errorHandler));
  }

  getAllCategory(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(`${this.baseUrl}/category/list`)
      .pipe(catchError(this.errorHandler));
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.baseUrl}/user/list`)
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

  getUserById(id: number): Observable<User> {
    return this.httpClient
      .get<User>(`${this.baseUrl}/user/detail/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //add REST
  addProduct(product: any): Observable<any> {
    console.log('add product service');
    return this.httpClient
      .post<Product>(
        `${this.baseUrl}/product/create`,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  addCategory(category: any): Observable<any> {
    return this.httpClient
      .post<Category>(
        `${this.baseUrl}/category/create`,
        JSON.stringify(category),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  addUser(category: any): Observable<any> {
    return this.httpClient
      .post<User>(
        `${this.baseUrl}/user/create`,
        JSON.stringify(category),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Update REST
  updateProduct(product: Product): Observable<any> {
    return this.httpClient
      .put<Product>(
        `${this.baseUrl}/product/update`,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  updateCategory(category: Category): Observable<any> {
    return this.httpClient
      .put<Category>(
        `${this.baseUrl}/category/update`,
        JSON.stringify(category),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  updateUser(category: User): Observable<any> {
    return this.httpClient
      .put<User>(
        `${this.baseUrl}/user/update`,
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

  deleteUser(id: number) {
    return this.httpClient
      .delete<User>(`${this.baseUrl}/user/delete/${id}`, this.httpOptions)
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

  //Login
  login(loginModel?: loginmodel) {
    console.log('login');
    return this.httpClient.post<Role>(
      `${this.baseUrl}/login/`,
      loginModel,
      this.httpOptions
    );
  }

  //Logout
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('role');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  //Check Session
  checkSession() {
    var uname = localStorage.getItem('username');
    var pwd = localStorage.getItem('password');
    if (uname != null && pwd != null) {
      this.login({ username: uname, password: pwd }).subscribe((res) => {
        if (res != null) {
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
          localStorage.setItem('role', res.role);
        } else {
          this.logout()
        }
      });
    }else if(uname == 'null' || pwd == 'null'){
      this.logout()
    }
    
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  checkLogin() {
    return this.router.url;
  }
}
