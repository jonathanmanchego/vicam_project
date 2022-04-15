import { LoadingService } from 'src/app/services/layout/loading.service';
import { ContratoApiService } from './../../../../services/api/contrato-api.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Client } from 'src/app/commons/models/client';
import { PrestamistaInterface } from 'src/app/commons/state/interfaces/prestamista-interface';
import { PrestamistaApiService } from 'src/app/services/api/prestamista-api.service';
import { ClientstStateService } from 'src/app/services/state/clients-state.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { BreadcrumService } from 'src/app/services/layout/breadcrum.service';
import { BankApiService } from 'src/app/services/api/bank-api.service';
import { BankInterface } from 'src/app/commons/state/interfaces/bank-interface';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  clientsObservable: Observable<Array<any>> = new Observable<Array<any>>();
  avgAges = 0;
  devStandar = 0;
  clients: Array<PrestamistaInterface> = [];
  bancos: BankInterface[] = [];
  constructor(
    private readonly prestamistaApiService: PrestamistaApiService,
    private readonly contratoApiService: ContratoApiService,
    private readonly loadingService: LoadingService,
    private readonly breadcrumService: BreadcrumService,
    private readonly bancoService: BankApiService
  ) {}

  ngOnInit(): void {
    this.breadcrumService.setBreadcrum([
      {
        label: 'Inicio',
        current: false,
        link: '/',
      },
      {
        label: 'Clientes',
        current: true,
        link: undefined,
      },
    ]);
    this.initResources();
  }
  initResources(): void {
    const observables = [];
    if (this.bancoService.getValues().length === 0) {
      observables.push(this.bancoService.getAll());
    }
    observables.push(this.prestamistaApiService.getAll());
    this.loadingService.startLoading();
    forkJoin(observables).subscribe(
      () => {
        this.clients = this.prestamistaApiService.getValues();
        this.bancos = this.bancoService.getValues();
        this.loadingService.stopLoading();
      },
      () => {
        this.loadingService.stopLoading();
      }
    );
  }
  generateContract(prestamista: PrestamistaInterface): void {
    this.loadingService.startLoading();
    this.contratoApiService.generateContract(prestamista.id).subscribe(
      (responseFile) => {
        const mediaType = 'application/pdf';
        const file = new Blob([responseFile], {
          type: mediaType,
        });
        this.loadingService.stopLoading();
        Swal.fire('Contrato generado con exito', '', 'success');
        saveAs(
          file,
          'contrato-' +
            prestamista.prestamista_nombres +
            '-' +
            prestamista.prestamista_apellidos +
            '.pdf'
        );
      },
      () => {
        this.loadingService.stopLoading();
        Swal.fire('Problemas al generar contrato', '', 'error');
      }
    );
  }
  parseBanco(bancoId: number): string {
    const bancoWanted = this.bancos.find((item) => item.id === bancoId);
    if (bancoWanted) {
      return bancoWanted.banco_name;
    }
    return '';
  }
}
