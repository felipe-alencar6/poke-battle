import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
})
export class MainPageComponent implements OnInit {
  constructor(private apiService: ApiCallService) {}
  ngOnInit() {
    this.apiService.teste();
  }
}
