import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BanksStateService } from 'src/app/services/state/banks-state.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {
  banksObservable: Observable<Array<any>> = new Observable<Array<any>>();
  constructor(private readonly banksStateService: BanksStateService) {}

  ngOnInit(): void {
    this.banksObservable = this.banksStateService.items;
  }
}
