import { BankInterface } from '../state/interfaces/bank-interface';
import { Bank } from './bank';

export interface CreditCard {
  accountNumber: string;
  facturationDate: number;
  bank: BankInterface;
  amount: number;
  dueDate: number;
}
