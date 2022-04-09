import { UsuarioInterface } from './../../../../commons/state/interfaces/usuario-interface';
import { PlazosPagoInterface } from './../../../../commons/state/interfaces/plazos-pago-interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/commons/models/client';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { CreditCard } from 'src/app/commons/models/credit-card';
import { Bank } from 'src/app/commons/models/bank';
import { BanksStateService } from 'src/app/services/state/banks-state.service';
import { ClientstStateService } from 'src/app/services/state/clients-state.service';
import { BankApiService } from 'src/app/services/api/bank-api.service';
import { PrestamistaApiService } from 'src/app/services/api/prestamista-api.service';
import { BankInterface } from 'src/app/commons/state/interfaces/bank-interface';
import { PlazosPagosApiService } from 'src/app/services/api/plazos-pagos-api.service';
import { forkJoin } from 'rxjs';
import { PrestamistaInterface } from 'src/app/commons/state/interfaces/prestamista-interface';

interface UserInterface {
  user_nick: string;
  user_password: string;
  prestamista: PrestamistaInterface;
}
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  formCreateClient: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    documentNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    bank: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    isCreditCard: new FormControl(false),
    interes: new FormControl(0, Validators.required),
    duration: new FormControl(2),
  });
  creditCards: CreditCard[] = [];
  banks: BankInterface[] = [];
  plazos: PlazosPagoInterface[] = [];
  loading = false;

  constructor(
    private readonly prestamistaApiService: PrestamistaApiService,
    private readonly bankApiService: BankApiService,
    private readonly plazosPagosApiService: PlazosPagosApiService,
    private readonly route: Router
  ) {}

  ngOnInit(): void {
    this.formCreateClient.reset();
    this.initResources();
  }
  initResources(): void {
    const observables = [];
    if (this.bankApiService.getValues().length === 0) {
      observables.push(this.bankApiService.getAll());
    }
    if (this.plazosPagosApiService.getValues().length === 0) {
      observables.push(this.plazosPagosApiService.getAll());
    }
    if (observables.length > 0) {
      this.loading = true;
      forkJoin(observables).subscribe({
        next: () => {
          this.banks = this.bankApiService.getValues();
          this.plazos = this.plazosPagosApiService.getValues();
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          Swal.fire({
            title: '¡Atención!',
            text: 'Problemas al cargar la información',
            icon: 'error',
          });
        },
      });
    } else {
      this.banks = this.bankApiService.getValues();
      this.plazos = this.plazosPagosApiService.getValues();
    }
  }
  initCreditCards(): void {
    if (this.isCreditCard()) {
      this.creditCards = [
        {
          accountNumber: '',
          facturationDate: 1,
          dueDate: 1,
          bank: {
            id: 0,
            banco_name: '',
          },
          amount: 0.0,
        },
      ];
    } else {
      this.creditCards = [];
    }
  }
  addCreditCard(): void {
    this.creditCards.push({
      accountNumber: '',
      facturationDate: 2,
      dueDate: 1,
      bank: {
        id: 0,
        banco_name: '',
      },
      amount: 0.0,
    });
  }
  isCreditCard(): boolean {
    const { isCreditCard } = this.formCreateClient.value;
    return isCreditCard;
  }
  validateFormControl(field: string): string {
    const formControl = this.formCreateClient.get(field);
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
  setFacturationDate(event: MatSelectChange, creditCard: CreditCard): void {
    const bank = this.banks.find((bank) => bank.id === event.value);
    if (bank) {
      creditCard.bank = bank;
    }
  }
  saveNewClient(): void {
    if (!this.formCreateClient.valid) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Información incompleta',
        icon: 'info',
      });
      return;
    }
    const {
      firstName,
      lastName,
      documentNumber,
      phoneNumber,
      accountNumber,
      email,
      address,
      bank,
    } = this.formCreateClient.value;
    const creditCards: CreditCard[] = this.creditCards.map((item) => ({
      dueDate: item.dueDate,
      accountNumber: item.accountNumber,
      facturationDate: Number(item.facturationDate),
      bank: item.bank,
      amount: item.amount,
    }));
    const bankSelected = this.banks.find((item) => item.id === +bank);
    const newClient: UserInterface = {
      prestamista: {
        id: 0,
        prestamista_nombres: firstName,
        prestamista_apellidos: lastName,
        prestamista_celular1: phoneNumber,
        prestamista_dni: documentNumber,
        prestamista_correo: email,
        prestamista_direccion: address,
        prestamista_codigo: '',
        prestamista_password: '',
        prestamista_celular2: '',
      },
      user_nick: '',
      user_password: '',
    };
    this.prestamistaApiService.create(newClient).subscribe({
      next: () => {
        Swal.fire({
          title: 'Correcto',
          text: 'Se pudo guardar correctamente',
          icon: 'success',
        });
        this.route.navigateByUrl('/clientes/list');
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
