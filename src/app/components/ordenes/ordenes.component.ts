import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { OrdenesModel } from 'src/app/models/ordenes.model';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  ordenes: OrdenesModel[];
  constructor(private ordenesService: OrdenesService) { }

  ngOnInit(): void {
    this.GetOrdenes();
  }

  GetOrdenes(){
    this.ordenesService.GetOrdenes().subscribe((Response: OrdenesModel[]) => {
      this.ordenes = Response;
      console.log(Response);
    });
  }

}
