import { BankInterface } from './bank-interface';
import { PrestamistaInterface } from './prestamista-interface';
import { TarjetaInterface } from './tarjeta-interface';

export interface CuentaAhorroInterface {
  cuenta_ahorro_id?: number;
  cuenta_numero: string;
  tarjeta_id?: number;
  prestamista_id: number;
  banco_id: number;
  banco?: BankInterface;
  prestamista?: PrestamistaInterface;
  tarjeta?: TarjetaInterface;
}
