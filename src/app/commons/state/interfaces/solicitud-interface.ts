import { BankInterface } from './bank-interface';
import { CuentaAhorroInterface } from './cuenta-ahorro-interface';
import { EstadoSolicitudInterface } from './estado-solicitud-interface';
import { ModelInterface } from './model-interface';
import { PlazosPagoInterface } from './plazos-pago-interface';
import { PrestamistaInterface } from './prestamista-interface';
import { TarjetaInterface } from './tarjeta-interface';
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
  prestamista?: PrestamistaInterface;
  banco?: BankInterface;
  cuenta_ahorro?: CuentaAhorroInterface;
  estado_solicitud?: EstadoSolicitudInterface;
  plazo_pago?: PlazosPagoInterface;
  tarjeta?: TarjetaInterface;
}
