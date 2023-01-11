import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../shared/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  url = 'https://pokeapi.co/api/v2/pokemon/';
  getUsers(): Observable<Object> {
    return this.http.get(this.url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  teste() {
    this.getUsers().subscribe((data) => console.log(data));
  }
}
