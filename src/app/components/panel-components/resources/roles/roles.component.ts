import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RolInterface } from 'src/app/commons/state/interfaces/rol-interface';
import { RolesApiService } from 'src/app/services/api/roles-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  formCreate: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });
  roles: RolInterface[] = [];
  loading = true;
  constructor(private readonly rolesApiService: RolesApiService) {}

  ngOnInit(): void {
    this.initTable();
  }
  initTable(): void {
    if (this.rolesApiService.getValues().length > 0) {
      this.roles = this.rolesApiService.getValues();
    } else {
      this.loading = true;
      this.rolesApiService.getAll().subscribe(
        () => {
          this.roles = this.rolesApiService.getValues();
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
    const rolToCreate: RolInterface = {
      id: 0,
      rol: name,
      rol_descripcion: descripcion,
    };
    this.rolesApiService.create(rolToCreate).subscribe({
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
