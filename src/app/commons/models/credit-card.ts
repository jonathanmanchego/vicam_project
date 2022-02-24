import { Bank } from "./bank";

export interface CreditCard {
  accountNumber: string,
  facturationDate: number,
  bank: Bank
}
