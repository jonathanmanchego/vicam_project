import { Bank } from "./bank";
import { CreditCard } from "./credit-card";

export interface Client {
  id?: number,
  firstName: string,
  lastName: string,
  documentNumber: string,
  phoneNumber: string,
  accountNumber: string,
  email: string,
  address: string,
  creditCards: CreditCard[]
  bank: Bank
}
