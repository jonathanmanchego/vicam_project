import { BreadcrumService } from './../../../../services/layout/breadcrum.service';
import { saveAs } from 'file-saver';
import { PlazosPagoInterface } from 'src/app/commons/state/interfaces/plazos-pago-interface';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { SolicitudInterface } from 'src/app/commons/state/interfaces/solicitud-interface';
import { SolicitudApiService } from 'src/app/services/api/solicitud-api.service';
import { PrestamistaInterface } from 'src/app/commons/state/interfaces/prestamista-interface';
import { ContratoApiService } from 'src/app/services/api/contrato-api.service';
import { LoadingService } from 'src/app/services/layout/loading.service';

@Component({
  selector: 'app-list-solicitudes',
  templateUrl: './list-solicitudes.component.html',
  styleUrls: ['./list-solicitudes.component.scss'],
})
export class ListSolicitudesComponent implements OnInit {
  solicitudes: SolicitudInterface[] = [];
  constructor(
    private readonly solicitudApiService: SolicitudApiService,
    private readonly contratoApiService: ContratoApiService,
    private readonly loadingService: LoadingService,
    private readonly breadcrumService: BreadcrumService
  ) {}

  ngOnInit(): void {
    this.breadcrumService.setBreadcrum([
      {
        label: 'Inicio',
        current: false,
        link: '/',
      },
      {
        label: 'Solicitudes',
        current: true,
        link: undefined,
      },
    ]);
    this.initSolicitudes();
  }
  initSolicitudes(): void {
    this.loadingService.startLoading();
    this.solicitudApiService.getAll().subscribe(
      () => {
        this.solicitudes = this.solicitudApiService.getValues();
        this.loadingService.stopLoading();
      },
      () => {
        this.loadingService.stopLoading();
        Swal.fire('Carga de datos', '', 'error');
      }
    );
  }
  parseFullName(prestamista: PrestamistaInterface | undefined): string {
    if (prestamista) {
      return `${prestamista.prestamista_nombres} ${prestamista.prestamista_apellidos}`;
    }
    return '';
  }
  parsePlazoPago(plazoPago: PlazosPagoInterface | undefined): string {
    if (plazoPago) {
      return `${plazoPago.plazo_pago_meses} meses a ${Number(
        plazoPago.plazo_pago_tasa_interes
      ).toFixed(2)}% de interes`;
    }
    return '';
  }
  generateContract(prestamista: PrestamistaInterface | undefined): void {
    if (!prestamista) {
      Swal.fire('Información faltante sobre el prestamista', '', 'info');
      return;
    }
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
}
