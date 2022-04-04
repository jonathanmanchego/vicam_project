import { map, Observable } from 'rxjs';
import { BankApiService } from 'src/app/services/api/bank-api.service';
import { BankInterface } from './../interfaces/bank-interface';
export class BankClass<BankInterface> {
  id: number;
  name: string;
  http = new BankApiService();
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  save(): Observable<BankClass<BankInterface>> {
    return this.http
      .create({
        id: this.id,
        name: this.name,
      })
      .pipe(map((value, index) => new BankClass(value.id, value.name)));
  }
}
