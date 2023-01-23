import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, Subject, mergeMap, from, toArray } from 'rxjs';
import { Pokemon } from '../shared/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}
  x: any[] = [];
  url = 'https://pokeapi.co/api/v2/pokemon/';

  getAllPokes(): Observable<any[]> {
    return this.http.get(this.url).pipe(
      mergeMap((res: any) => {
        return from(res.results).pipe(
          mergeMap((result: any) => {
            return this.http.get(result.url);
          })
        );
      }),
      toArray()
    );
  }

  getPokeMoves(): Observable<any> {
    return this.getAllPokes().pipe(
      map((res: any) => {
        res.forEach((res: any) => {
          return;
        });
      })
    );
  }
}
