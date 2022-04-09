import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankInterface } from 'src/app/commons/state/interfaces/bank-interface';
import { BankApiService } from 'src/app/services/api/bank-api.service';
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
  @Output() created = new EventEmitter();
  constructor(
    private readonly banksStateService: BankApiService,
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
    const bankToCreate: BankInterface = {
      id: 0,
      banco_name: name,
      // facturationDate: +facturationDate,
    };
    this.banksStateService.create(bankToCreate).subscribe({
      next: () => {
        Swal.fire({
          title: 'Correcto',
          text: 'Se pudo guardar correctamente',
          icon: 'success',
        });
        this.created.emit(true);
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
