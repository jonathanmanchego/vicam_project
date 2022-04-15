import { EstadoSolicitudesApiService } from './../../../../services/api/estado-solicitudes-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EstadoSolicitudInterface } from 'src/app/commons/state/interfaces/estado-solicitud-interface';
import Swal from 'sweetalert2';
import { BreadcrumService } from 'src/app/services/layout/breadcrum.service';

@Component({
  selector: 'app-estado-solicitudes',
  templateUrl: './estado-solicitudes.component.html',
  styleUrls: ['./estado-solicitudes.component.scss'],
})
export class EstadoSolicitudesComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });
  loading = false;
  estadoSolicitudes: Array<EstadoSolicitudInterface> = [];
  constructor(
    private readonly estadoSolicitudesApiService: EstadoSolicitudesApiService,
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
        label: 'Datos Generales',
        current: false,
        link: '/resources/',
      },
      {
        label: 'Bancos',
        current: true,
        link: undefined,
      },
    ]);
    this.initTable();
  }
  initTable(): void {
    if (this.estadoSolicitudesApiService.getValues().length > 0) {
      this.estadoSolicitudes = this.estadoSolicitudesApiService.getValues();
    } else {
      this.loading = true;
      this.estadoSolicitudesApiService.getAll().subscribe(
        () => {
          this.estadoSolicitudes = this.estadoSolicitudesApiService.getValues();
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
    const { name, descripcion } = this.formCreate.value;
    const estadoToCreate: EstadoSolicitudInterface = {
      id: 0,
      estado_solicitud: name,
      estado_solicitud_descripcion: descripcion,
    };
    this.estadoSolicitudesApiService.create(estadoToCreate).subscribe({
      next: () => {
        Swal.fire({
          title: 'Correcto',
          text: 'Se pudo guardar correctamente',
          icon: 'success',
        });
        this.initTable();
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
