import { ModelInterface } from './model-interface';

export interface PlazosPagoInterface extends ModelInterface {
  plazo_pago_meses: number;
  plazo_pago_tasa_interes: string;
  plazo_pago_anios: number;
}
