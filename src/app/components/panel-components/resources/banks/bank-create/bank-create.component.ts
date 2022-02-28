import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BanksStateService } from 'src/app/services/state/banks-state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss'],
})
export class BankCreateComponent implements OnInit {
  formCreateBank: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    facturationDate: new FormControl(1, Validators.required),
  });
  constructor(
    private readonly banksStateService: BanksStateService,
    private readonly route: Router
  ) {}

  ngOnInit(): void {
    this.formCreateBank.reset();
  }
  validateFormControl(field: string): string {
    const formControl = this.formCreateBank.get(field);
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
    if (!this.formCreateBank.valid) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Información incompleta',
        icon: 'info',
      });
      return;
    }
    const { name, facturationDate } = this.formCreateBank.value;
    const bankToCreate = {
      id: 0,
      name,
      facturationDate: +facturationDate,
    };
    this.banksStateService.create(bankToCreate).subscribe({
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
    });
  }
}
