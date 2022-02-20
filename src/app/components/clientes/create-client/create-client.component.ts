import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientstStateService } from 'src/app/services/clients-state.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';


interface CreditCard {
  accountNumber: string,
  facturationDate: string
}
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})

export class CreateClientComponent implements OnInit {
  formCreateClient: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    documentNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    accountNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    address: new FormControl('', Validators.required),
    isCreditCard: new FormControl(false)
  });
  creditCards: CreditCard[] = [];
  constructor(
    private readonly clientStateService: ClientstStateService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    this.formCreateClient.reset();
  }
  initCreditCards(): void {
    this.creditCards = [
      {
        accountNumber: '',
        facturationDate: ''
      }
    ];
  }
  addCreditCard(): void {
    this.creditCards.push({
      accountNumber: '',
      facturationDate: ''
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
      if (formControl.hasError('minlength') || formControl.hasError('maxlength')) {
        return 'Este campo debe ser llenado correctamente.';
      }
    }
    return '';
  }
  saveNewClient(): void {
    const { firstName, lastName, documentNumber, phoneNumber, accountNumber, email, address } = this.formCreateClient.value;
    const creditCards: CreditCard[] = this.creditCards.map(item => ({
      accountNumber: item.accountNumber,
      facturationDate: moment(item.facturationDate).format('DD-MM-YYYY')
    }));
    const newClient: Client = {
      firstName,
      lastName,
      phoneNumber,
      documentNumber,
      accountNumber,
      email,
      address,
      creditCards
    };
    console.log(creditCards)
    return;
    this.clientStateService.create(newClient)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Correcto',
            text: 'Se pudo guardar correctamente',
            icon: 'success'
          });
          this.route.navigateByUrl('/clientes/list');
        },
        error: () => {
          Swal.fire({
            title: '¡Atención!',
            text: 'No se pudo guardar correctamente',
            icon: 'info'
          });
        }
      }
      );
  }
}
