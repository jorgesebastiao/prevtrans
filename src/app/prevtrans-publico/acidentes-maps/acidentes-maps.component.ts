import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acidentes-maps',
  templateUrl: './acidentes-maps.component.html',
  styleUrls: ['./acidentes-maps.component.css']
})
export class AcidentesMapsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  lat:  number=  -27.900756;
  lng:  number=  -50.756954;
  zoom: number= 15;
}
