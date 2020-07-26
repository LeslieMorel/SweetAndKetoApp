import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orden-confirmacion',
  templateUrl: './orden-confirmacion.component.html',
  styleUrls: ['./orden-confirmacion.component.scss']
})
export class OrdenConfirmacionComponent implements OnInit {

  ordenId: string;
  constructor(private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe(Response => {
      this.ordenId = Response.get('orden');
    });
  }

}
