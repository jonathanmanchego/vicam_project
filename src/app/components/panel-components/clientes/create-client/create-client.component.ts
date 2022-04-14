import { CuentaAhorroInterface } from './../../../../commons/state/interfaces/cuenta-ahorro-interface';
import { TarjetaApiService } from './../../../../services/api/tarjeta-api.service';
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
import { TarjetaInterface } from 'src/app/commons/state/interfaces/tarjeta-interface';
import { TipoTarjetaApiService } from 'src/app/services/api/tipo-tarjeta-api.service';
import { TipoTarjetaInterface } from 'src/app/commons/state/interfaces/tipo-tarjeta-interface';
import { SolicitudApiService } from 'src/app/services/api/solicitud-api.service';
import { SolicitudInterface } from 'src/app/commons/state/interfaces/solicitud-interface';
import * as moment from 'moment';

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
    interes: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    duration: new FormControl(2),
    amount: new FormControl(0, Validators.required),
    pais: new FormControl(),
    departamento: new FormControl(),
    provincia: new FormControl(),
    localidad: new FormControl(),
  });
  creditCards: TarjetaInterface[] = [];
  banks: BankInterface[] = [];
  plazos: PlazosPagoInterface[] = [];
  tipoTarjetas: TipoTarjetaInterface[] = [];
  loading = false;

  constructor(
    private readonly tipoTarjetaApiService: TipoTarjetaApiService,
    private readonly tarjetaApiService: TarjetaApiService,
    private readonly prestamistaApiService: PrestamistaApiService,
    private readonly bankApiService: BankApiService,
    private readonly plazosPagosApiService: PlazosPagosApiService,
    private readonly solicitudApiService: SolicitudApiService,
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
    // if (this.tipoTarjetaApiService.getValues().length === 0) {
    //   observables.push(this.tipoTarjetaApiService.getAll());
    // }
    if (observables.length > 0) {
      this.loading = true;
      forkJoin(observables).subscribe({
        next: () => {
          this.banks = this.bankApiService.getValues();
          this.plazos = this.plazosPagosApiService.getValues();
          // this.tipoTarjetas = this.tipoTarjetaApiService.getValues();
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.banks = this.bankApiService.getValues();
          this.plazos = this.plazosPagosApiService.getValues();
          // this.tipoTarjetas = this.tipoTarjetaApiService.getValues();
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
          id: 0,
          tarjeta_num: '',
          facturation_date: 1,
          due_date: 1,
          banco_id: this.banks.length > 0 ? this.banks[0].id : 0,
          amount: 0.0,
          tipo_tarjeta_id:
            this.tipoTarjetas.length > 0 ? this.tipoTarjetas[0].id : 0,
          prestamista_id: 0,
        },
      ];
    } else {
      this.creditCards = [];
    }
  }
  addCreditCard(): void {
    this.creditCards.push({
      id: 0,
      tarjeta_num: '',
      facturation_date: 1,
      due_date: 1,
      banco_id: this.banks ? this.banks[0].id : 0,
      amount: 0.0,
      tipo_tarjeta_id: this.tipoTarjetas ? this.tipoTarjetas[0].id : 0,
      prestamista_id: 0,
    });
  }
  changeDurationContract(event: number): void {
    const plazo = this.plazos.find((item) => item.id === event);
    this.formCreateClient.patchValue({
      interes: (Number(plazo?.plazo_pago_tasa_interes) * 100).toFixed(2) + '%',
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
      duration,
      interes,
      amount,
      bank,
      pais,
      provincia,
      localia,
    } = this.formCreateClient.value;

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
        pais_id: pais,
        provincia_id: provincia,
        localia_id: localia,
      },
      user_nick: '',
      user_password: '',
    };
    this.prestamistaApiService.create(newClient).subscribe({
      next: (prestamista: PrestamistaInterface) => {
        const creditCards: TarjetaInterface[] = this.creditCards.map(
          (item) => ({
            due_date: item.due_date,
            tarjeta_num: item.tarjeta_num,
            facturation_date: Number(item.facturation_date),
            banco_id: item.banco_id,
            amount: item.amount,
            id: 0,
            prestamista_id: prestamista.id,
            tipo_tarjeta_id: 1,
            cuenta_ahorro: {
              banco_id: item.banco_id,
              cuenta_numero: item.tarjeta_num,
              id: 0,
              prestamista_id: prestamista.id,
            },
          })
        );
        const cuentaAhorro = {
          banco_id: +bank,
          id: 0,
          prestamista_id: prestamista.id,
          tarjeta_num: accountNumber,
          tipo_tarjeta_id: 2,
          cuenta_ahorro: {
            id: 0,
            banco_id: +bank,
            cuenta_numero: accountNumber,
            prestamista_id: prestamista.id,
          },
        };
        if (creditCards.length > 0) {
          const observablesCards = creditCards.map((item) =>
            this.tarjetaApiService.create(item)
          );
          forkJoin(observablesCards).subscribe({
            next: () => {},
            complete: () => {
              this.tarjetaApiService.create(cuentaAhorro).subscribe({
                next: (tarjetaCreated: TarjetaInterface) => {
                  const plazo = this.plazos.find(
                    (item) => item.id === duration
                  );
                  const solicitud: SolicitudInterface = {
                    id: 0,
                    solicitud_boucher: '',
                    banco_id: +bank,
                    cuenta_ahorro_id:
                      tarjetaCreated.cuentas_ahorro &&
                      tarjetaCreated.cuentas_ahorro.length > 0
                        ? tarjetaCreated.cuentas_ahorro[0].id
                        : 0,
                    estado_solicitud_id: 1,
                    plazo_pago_id: duration,
                    prestamista_id: prestamista.id,
                    solicitud_duracion_meses: plazo?.plazo_pago_meses || 1,
                    solicitud_fecha: moment().format(),
                    solicitud_monto: amount,
                    solicitud_numero: '',
                    solicitud_numero_deposito: '',
                    tarjeta_id: tarjetaCreated.id,
                  };
                  this.solicitudApiService.create(solicitud).subscribe(
                    () => {
                      this.loading = false;
                      Swal.fire({
                        title: 'Correcto',
                        text: 'Se pudo guardar correctamente',
                        icon: 'success',
                      });

                      this.route.navigateByUrl('/clientes');
                    },
                    () => {
                      this.loading = false;
                      Swal.fire({
                        title: '¡Atención!',
                        text: 'No se pudo guardar correctamente',
                        icon: 'info',
                      });
                    }
                  );
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
        } else {
          this.tarjetaApiService.create(cuentaAhorro).subscribe({
            next: (tarjetaCreated: TarjetaInterface) => {
              const plazo = this.plazos.find((item) => item.id === duration);
              const solicitud: SolicitudInterface = {
                id: 0,
                solicitud_boucher: '',
                banco_id: +bank,
                cuenta_ahorro_id:
                  tarjetaCreated.cuentas_ahorro &&
                  tarjetaCreated.cuentas_ahorro.length > 0
                    ? tarjetaCreated.cuentas_ahorro[0].id
                    : 0,
                estado_solicitud_id: 1,
                plazo_pago_id: duration,
                prestamista_id: prestamista.id,
                solicitud_duracion_meses: plazo?.plazo_pago_meses || 1,
                solicitud_fecha: moment().format(),
                solicitud_monto: amount,
                solicitud_numero: '',
                solicitud_numero_deposito: '',
                tarjeta_id: tarjetaCreated.id,
              };
              this.solicitudApiService.create(solicitud).subscribe(
                () => {
                  this.loading = false;
                  Swal.fire({
                    title: 'Correcto',
                    text: 'Se pudo guardar correctamente',
                    icon: 'success',
                  });

                  this.route.navigateByUrl('/clientes');
                },
                () => {
                  this.loading = false;
                  Swal.fire({
                    title: '¡Atención!',
                    text: 'No se pudo guardar correctamente',
                    icon: 'info',
                  });
                }
              );
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
