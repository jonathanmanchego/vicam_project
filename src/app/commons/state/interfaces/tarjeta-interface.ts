import { BankInterface } from './bank-interface';
import { CuentaAhorroInterface } from './cuenta-ahorro-interface';
import { ModelInterface } from './model-interface';
import { PrestamistaInterface } from './prestamista-interface';
import { TipoTarjetaInterface } from './tipo-tarjeta-interface';

export interface TarjetaInterface extends ModelInterface {
  tarjeta_num: string;
  banco_id: number;
  bank?: BankInterface;
  tipo_tarjeta_id: number;
  tipo_tarjeta?: TipoTarjetaInterface;
  facturation_date?: number;
  due_date?: number;
  prestamista_id: number;
  prestamista?: PrestamistaInterface;
  amount?: number;
  cuotas?: number;
  cuotas_monto?: number;
  cuentas_ahorro?: CuentaAhorroInterface[];
}
