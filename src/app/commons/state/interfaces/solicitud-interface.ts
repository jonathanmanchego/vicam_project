import { ModelInterface } from './model-interface';
export interface SolicitudInterface extends ModelInterface {
  estado_solicitud_id: number;
  cuenta_ahorro_id: number;
  tarjeta_id: number;
  prestamista_id: number;
  banco_id: number;
  plazo_pago_id: number;
  solicitud_numero: string;
  solicitud_fecha: string;
  solicitud_numero_deposito: string;
  solicitud_boucher: string; // path del boucher en dropbox
  solicitud_duracion_meses: number;
  solicitud_monto: number;
}
