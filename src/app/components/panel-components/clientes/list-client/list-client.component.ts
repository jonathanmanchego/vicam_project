import { LoadingService } from 'src/app/services/layout/loading.service';
import { ContratoApiService } from './../../../../services/api/contrato-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/commons/models/client';
import { PrestamistaInterface } from 'src/app/commons/state/interfaces/prestamista-interface';
import { PrestamistaApiService } from 'src/app/services/api/prestamista-api.service';
import { ClientstStateService } from 'src/app/services/state/clients-state.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

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
  constructor(
    private readonly prestamistaApiService: PrestamistaApiService,
    private readonly contratoApiService: ContratoApiService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.prestamistaApiService.getAll().subscribe(
      (res: Array<PrestamistaInterface>) => {
        this.clients = this.prestamistaApiService.getValues();
        this.loadingService.stopLoading();
      },
      () => {
        this.loadingService.stopLoading();
      }
    );
  }
  generateContract(prestamista: PrestamistaInterface): void {
    this.contratoApiService.generateContract(prestamista.id).subscribe(
      (responseFile) => {
        const mediaType = 'application/pdf';
        const file = new Blob([responseFile], {
          type: mediaType,
        });
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
        Swal.fire('Problemas al generar contrato', '', 'error');
      }
    );
  }
}
