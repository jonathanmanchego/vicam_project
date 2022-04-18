import { ModelInterface } from './model-interface';

export interface ProvinciaInterface extends ModelInterface {
  provincia: string;
  departamento_id: number;
}
