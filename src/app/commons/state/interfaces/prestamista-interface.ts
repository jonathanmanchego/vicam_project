import { TarjetaInterface } from 'src/app/commons/state/interfaces/tarjeta-interface';
import { CuentaAhorroInterface } from './cuenta-ahorro-interface';
import { ModelInterface } from './model-interface';

export interface PrestamistaInterface extends ModelInterface {
  prestamista_codigo: string;
  prestamista_nombres: string;
  prestamista_apellidos: string;
  prestamista_dni: string;
  prestamista_celular1: string;
  prestamista_celular2?: string;
  prestamista_telefono?: string;
  prestamista_correo: string;
  prestamista_password: string;
  prestamista_direccion: string;
  localia_id: number;
  provincia_id: number;
  pais_id: number;
  tarjetas?: TarjetaInterface[];
  cuenta_ahorro?: CuentaAhorroInterface;
}
