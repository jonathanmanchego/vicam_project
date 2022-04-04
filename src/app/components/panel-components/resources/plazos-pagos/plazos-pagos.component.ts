import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plazos-pagos',
  templateUrl: './plazos-pagos.component.html',
  styleUrls: ['./plazos-pagos.component.scss'],
})
export class PlazosPagosComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    facturationDate: new FormControl(1, Validators.required),
  });
  banksObservable: Observable<Array<any>> = new Observable<Array<any>>();
  constructor() {}

  ngOnInit(): void {
    this.formCreate.reset();
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
    const { name, facturationDate } = this.formCreate.value;
    const bankToCreate = {
      id: 0,
      name,
      facturationDate: +facturationDate,
    };
    /* this.banksStateService.create(bankToCreate).subscribe({
      next: () => {
        Swal.fire({
          title: 'Correcto',
          text: 'Se pudo guardar correctamente',
          icon: 'success',
        });
        this.route.navigateByUrl('/resources/bancos/list');
      },
      error: () => {
        Swal.fire({
          title: '¡Atención!',
          text: 'No se pudo guardar correctamente',
          icon: 'info',
        });
      },
    }); */
  }
}
