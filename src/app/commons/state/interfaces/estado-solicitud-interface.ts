import { ModelInterface } from './model-interface';

export interface EstadoSolicitudInterface extends ModelInterface {
  estado_solicitud: string;
  estado_solicitud_descripcion: string;
}
