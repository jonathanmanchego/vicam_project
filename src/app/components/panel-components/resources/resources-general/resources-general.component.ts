import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources-general',
  templateUrl: './resources-general.component.html',
  styleUrls: ['./resources-general.component.scss'],
})
export class ResourcesGeneralComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}
  navigateTo(resource: string): void {
    this.router.navigateByUrl('/resources' + resource);
  }
}
