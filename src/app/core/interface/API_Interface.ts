import { Observable } from 'rxjs';
export interface APIStructuare {
  get(): Observable<any>;

  getById(id: any): Observable<any>;

  post(body: any): Observable<any>;

  put(body: any, id: any): Observable<any>;
  
  patch(body: any, id: any): Observable<any>;

  delete(id: any): Observable<any>;
}
