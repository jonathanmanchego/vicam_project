import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoPagoInterface } from 'src/app/commons/state/interfaces/estado-pago-interface';
import { EstadoPagoApiService } from 'src/app/services/api/estado-pago-api.service';

@Component({
  selector: 'app-estado-pagos',
  templateUrl: './estado-pagos.component.html',
  styleUrls: ['./estado-pagos.component.scss'],
})
export class EstadoPagosComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });
  loading = false;
  estadoPagos: EstadoPagoInterface[] = [];
  constructor(private readonly estadoPagoApiService: EstadoPagoApiService) {}

  ngOnInit(): void {
    this.formCreate.reset();
    this.initTable();
  }
  initTable(): void {
    if (this.estadoPagoApiService.getValues().length > 0) {
      this.estadoPagos = this.estadoPagoApiService.getValues();
    } else {
      this.loading = true;
      this.estadoPagoApiService.getAll().subscribe(
        () => {
          this.estadoPagos = this.estadoPagoApiService.getValues();
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
    const estadoPagoToCreate = {
      id: 0,
      ep_estado: name,
      ep_descripcion: descripcion,
    };
    this.loading = true;
    this.estadoPagoApiService.create(estadoPagoToCreate).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          title: 'Correcto',
          text: 'Se pudo guardar correctamente',
          icon: 'success',
        });
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
