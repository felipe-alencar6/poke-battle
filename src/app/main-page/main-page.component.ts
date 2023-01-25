import { HttpClient } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  DoCheck,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiCallService } from '../service/api-call.service';
import { Pokemon } from '../shared/pokemon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  config!: any;
  spinner = true;

  ngOnInit() {
    this.getPokes();
    //this.getPokeData();
    this.apiService.getPokeMoves().subscribe();

    this.config = {
      id: 'basicPaginate',
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.pokeArray.length,
    };
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  getPokes() {
    this.apiService.getAllPokes().subscribe((data) => {
      this.pokeResponseArray = data;
      this.pokeResponseArray.sort((a, b) => {
        return a.order - b.order;
      });
      this.log();
    });
  }

  log() {
    for (let i = 0; i < 151; i++) {
      let poke = new Pokemon();
      poke.name = this.pokeResponseArray[i].name;

      for (let j = 0; j < 4; j++) {
        let randomNumber = Math.floor(
          Math.random() * this.pokeResponseArray[i].moves.length
        );
        //console.log(this.pokeResponseArray[i].moves[randomNumber].move.url);
        this.http
          .get(this.pokeResponseArray[i].moves[randomNumber].move.url)
          .pipe(
            map((res: any) => {
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
      this.spinner = false;
      this.pokeArray.push(poke);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
    return this.innerWidth;
  }

  colsSize() {
    if (this.onResize() <= 350) return 1;
    else if (this.onResize() > 350 && this.onResize() <= 610) return 2;
    else if (this.onResize() > 610 && this.onResize() <= 1000) return 3;
    else if (this.onResize() > 1000 && this.onResize() <= 1200) return 4;
    else return 6;
  }

  bgColor(array: any) {
    if (array.type1 == 'fire') return 'tomato';
    else if (array.type1 == 'grass') return 'limegreen';
    else if (array.type1 == 'bug') return 'olive';
    else if (array.type1 == 'normal') return 'lightyellow';
    else if (array.type1 == 'poison') return 'orchid';
    else if (array.type1 == 'fairy') return 'pink';
    else if (array.type1 == 'water') return 'lightskyblue';
    else if (array.type1 == 'ground') return '	burlywood';
    else if (array.type1 == 'fighting') return '	brown';
    else if (array.type1 == 'rock') return '		chocolate';
    else if (array.type1 == 'psychic') return '		mediumpurple';
    else if (array.type1 == 'electric') return '		khaki';
    else if (array.type1 == 'ghost') return '		lavender';
    else if (array.type1 == 'dragon') return '		cadetblue';
    else if (array.type1 == 'ice') return '		powderblue';
    else return 0;
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
