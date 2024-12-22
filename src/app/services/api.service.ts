import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  // Pobieranie listy użytkowników
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // Dodawanie nowego użytkownika
  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, userData);
  }

  // Edytowanie istniejącego użytkownika
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, userData);
  }

  // Usuwanie użytkownika
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`);
  }
}
