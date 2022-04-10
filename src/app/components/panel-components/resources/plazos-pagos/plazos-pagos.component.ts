import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlazosPagoInterface } from 'src/app/commons/state/interfaces/plazos-pago-interface';
import { PlazosPagosApiService } from 'src/app/services/api/plazos-pagos-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plazos-pagos',
  templateUrl: './plazos-pagos.component.html',
  styleUrls: ['./plazos-pagos.component.scss'],
})
export class PlazosPagosComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({
    anios: new FormControl(1, Validators.required),
    meses: new FormControl(1, Validators.required),
    tasaInteres: new FormControl(1, Validators.required),
  });
  loading = false;
  plazosPago: PlazosPagoInterface[] = [];
  constructor(private readonly plazosPagosApiService: PlazosPagosApiService) {}

  ngOnInit(): void {
    this.initTable();
  }
  initTable(): void {
    if (this.plazosPagosApiService.getValues().length > 0) {
      this.plazosPago = this.plazosPagosApiService.getValues();
    } else {
      this.loading = true;
      this.plazosPagosApiService.getAll().subscribe(
        () => {
          this.plazosPago = this.plazosPagosApiService.getValues();
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
    const { anios, meses, tasaInteres } = this.formCreate.value;
    const plazosPago: PlazosPagoInterface = {
      id: 0,
      plazo_pago_anios: anios,
      plazo_pago_meses: meses,
      plazo_pago_tasa_interes: tasaInteres,
    };
    this.loading = true;
    this.plazosPagosApiService.create(plazosPago).subscribe({
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
