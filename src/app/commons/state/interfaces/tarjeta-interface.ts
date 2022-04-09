import { ModelInterface } from './model-interface';

export interface TarjetaInterface extends ModelInterface {
  prestamista_id: number;
  banco_id: number;
  tarjeta_num: string;
  facturation_date?: number;
}
