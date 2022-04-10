import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EstadoContratoInterface } from 'src/app/commons/state/interfaces/estado-contrato-interface';
import { TipoTarjetaInterface } from 'src/app/commons/state/interfaces/tipo-tarjeta-interface';
import { TipoTarjetaApiService } from 'src/app/services/api/tipo-tarjeta-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-tarjetas',
  templateUrl: './tipo-tarjetas.component.html',
  styleUrls: ['./tipo-tarjetas.component.scss'],
})
export class TipoTarjetasComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  loading = false;
  tipoTarjetas: TipoTarjetaInterface[] = [];
  constructor(private readonly tipoTarjetaApiService: TipoTarjetaApiService) {}

  ngOnInit(): void {
    this.initTable();
  }
  initTable(): void {
    if (this.tipoTarjetaApiService.getValues().length > 0) {
      this.tipoTarjetas = this.tipoTarjetaApiService.getValues();
    } else {
      this.loading = true;
      this.tipoTarjetaApiService.getAll().subscribe(
        () => {
          this.tipoTarjetas = this.tipoTarjetaApiService.getValues();
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
  validateFormControl(field: string): string {
    const formControl = this.formCreate.get(field);
    if (formControl) {
      if (formControl.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if (
        formControl.hasError('minlength') ||
        formControl.hasError('maxlength')
      ) {
        return 'Este campo debe ser llenado correctamente.';
      }
    }
    return '';
  }
  save(): void {
    if (!this.formCreate.valid) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Información incompleta',
        icon: 'info',
      });
      return;
    }
    const { name } = this.formCreate.value;
    const tipoTarjetaToCreate: TipoTarjetaInterface = {
      id: 0,
      tipo_tarjeta: name,
    };
    this.loading = true;
    this.tipoTarjetaApiService.create(tipoTarjetaToCreate).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          title: 'Correcto',
          text: 'Se pudo guardar correctamente',
          icon: 'success',
        });
        this.initTable();
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          title: '¡Atención!',
          text: 'No se pudo guardar correctamente',
          icon: 'info',
        });
      },
    });
  }
}
