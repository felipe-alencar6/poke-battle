import { HttpClient } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  DoCheck,
  HostListener,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiCallService } from '../service/api-call.service';
import { Pokemon } from '../shared/pokemon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private apiService: ApiCallService,
    private pokemon: Pokemon,
    private http: HttpClient
  ) {}

  y = new Pokemon();
  pokeResponseArray: any[] = [];
  pokeArray: Pokemon[] = [];
  innerWidth!: number;

  ngOnInit() {
    this.getPokes();
    //this.getPokeData();
    this.apiService.getPokeMoves().subscribe();
  }

  getPokes() {
    this.apiService.getAllPokes().subscribe((data) => {
      console.log(data);

      this.pokeResponseArray = data;
      this.pokeResponseArray.sort((a, b) => {
        return a.order - b.order;
      });
      this.log();
    });
  }

  log() {
    for (let i = 0; i < 9; i++) {
      let poke = new Pokemon();
      poke.name = this.pokeResponseArray[i].name;

      console.log(this.pokeArray);
      for (let j = 0; j < 4; j++) {
        let randomNumber = Math.floor(
          Math.random() * this.pokeResponseArray[i].moves.length
        );
        //console.log(this.pokeResponseArray[i].moves[randomNumber].move.url);
        this.http
          .get(this.pokeResponseArray[i].moves[randomNumber].move.url)
          .pipe(
            map((res: any) => {
              console.log(res);
              poke.moves.push({ moveName: res.name, power: res.power });
            })
          )
          .subscribe();
      }
      poke.health = this.pokeResponseArray[i].stats[0].base_stat;
      poke.attack = this.pokeResponseArray[i].stats[1].base_stat;
      poke.defense = this.pokeResponseArray[i].stats[2].base_stat;
      poke.image = this.pokeResponseArray[i].sprites.front_default;
      if (this.pokeResponseArray[i].types.length == 2) {
        poke.types.push({
          type1: this.pokeResponseArray[i].types[0].type.name,
          type2: this.pokeResponseArray[i].types[1].type.name,
        });
      } else {
        poke.types.push({
          type1: this.pokeResponseArray[i].types[0].type.name,
          type2: '',
        });
      }

      this.pokeArray.push(poke);
    }
    console.log(this.pokeArray);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    return this.innerWidth;
  }

  colsSize() {
    if (this.onResize() <= 350) return 1;
    else if (this.onResize() > 350 && this.onResize() <= 610) return 2;
    else if (this.onResize() > 610 && this.onResize() <= 1200) return 4;
    else return 6;
  }

  // async getPokeData() {
  //   await this.apiService.getPokesFromUrl().subscribe((data) => {
  //     data.forEach((data) => {
  //       data.subscribe((data: any) => {
  //         this.pokeArray.push(data);
  //       });
  //     });
  //   });
  //   this.pokeArray.sort((a, b) => {
  //     return a.order - b.order;
  //   });

  //   // this.apiService.getOnPokeUrl().subscribe((data) => {
  //   //   console.log(data);
  //   // });
  // }
}
