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
  cuenta_ahorro?: CuentaAhorroInterface;
}
