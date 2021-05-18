import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-geofencedit',
  templateUrl: './geofencedit.component.html',
  styleUrls: ['./geofencedit.component.css']
})
export class GeofenceditComponent implements OnInit {
  @ViewChild('map2', { static: true }) map1;
 

  lat = -34.397;
  lng = 150.644;
  latA = -34.754764;
  lngA = 149.736246;
  zoom = 8;

  styles: any = [
    {
      featureType: 'all',
      stylers: [
        {
          saturation: -80
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          hue: '#00ffee'
        },
        {
          saturation: 50
        }
      ]
    },
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
