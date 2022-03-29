import { Bank } from './bank';

export interface CreditCard {
  accountNumber: string;
  facturationDate: number;
  bank: Bank;
  amount: number;
  dueDate: number;
}
