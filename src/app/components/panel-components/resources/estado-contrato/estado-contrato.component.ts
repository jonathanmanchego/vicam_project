import { EstadoContratoApiService } from './../../../../services/api/estado-contrato-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EstadoContratoInterface } from 'src/app/commons/state/interfaces/estado-contrato-interface';
import { EstadoPagoInterface } from 'src/app/commons/state/interfaces/estado-pago-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-contrato',
  templateUrl: './estado-contrato.component.html',
  styleUrls: ['./estado-contrato.component.scss'],
})
export class EstadoContratoComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });
  loading = false;
  estadoContratos: EstadoContratoInterface[] = [];
  constructor(
    private readonly estadoContratoApiService: EstadoContratoApiService
  ) {}

  ngOnInit(): void {
    this.initTable();
  }
  initTable(): void {
    if (this.estadoContratoApiService.getValues().length > 0) {
      this.estadoContratos = this.estadoContratoApiService.getValues();
    } else {
      this.loading = true;
      this.estadoContratoApiService.getAll().subscribe(
        () => {
          this.estadoContratos = this.estadoContratoApiService.getValues();
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
    const { name, descripcion } = this.formCreate.value;
    const estadoPagoToCreate: EstadoContratoInterface = {
      id: 0,
      estado_contrato: name,
      estado_contrato_descripcion: descripcion,
    };
    this.loading = true;
    this.estadoContratoApiService.create(estadoPagoToCreate).subscribe({
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
