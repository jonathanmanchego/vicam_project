import { CreditCard } from "./credit-cards";

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
}
