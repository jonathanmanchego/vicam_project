import { ModelInterface } from './model-interface';

export interface EstadoPagoInterface extends ModelInterface {
  ep_estado: string;
  ep_descripcion: string;
}
