import { ModelInterface } from './model-interface';

export interface DepartamentoInterface extends ModelInterface {
  departamento: string;
  pais_id: number;
}
