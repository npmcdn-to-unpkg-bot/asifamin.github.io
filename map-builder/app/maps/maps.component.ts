import {Component} from "angular2/core";
import L from 'leaflet';

@Component({
    selector: 'map',
    templateUrl: 'app/maps/maps.html',
    styleUrls: ['app/maps/maps.css'],
})
export class MapsComponent {
    bicycleRental = {
        "type": "FeatureCollection",
        "features": [
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9998241,
                        39.7471494
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 51
            },
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9983545,
                        39.7502833
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 52
            },
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9963919,
                        39.7444271
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 54
            },
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9960754,
                        39.7498956
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 55
            },
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9933717,
                        39.7477264
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 57
            },
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9913392,
                        39.7432392
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 58
            },
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -104.9788452,
                        39.6933755
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                },
                "id": 74
            }
        ]
    };
    campus = {
        "type": "Feature",
        "properties": {
            "popupContent": "This is the Auraria West Campus",
            "style": {
                weight: 2,
                color: "#999",
                opacity: 1,
                fillColor: "#B0DE5C",
                fillOpacity: 0.8
            }
        },
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
                [
                    [
                        [-105.00432014465332, 39.74732195489861],
                        [-105.00715255737305, 39.74620006835170],
                        [-105.00921249389647, 39.74468219277038],
                        [-105.01067161560059, 39.74362625960105],
                        [-105.01195907592773, 39.74290029616054],
                        [-105.00989913940431, 39.74078835902781],
                        [-105.00758171081543, 39.74059036160317],
                        [-105.00346183776855, 39.74059036160317],
                        [-105.00097274780272, 39.74059036160317],
                        [-105.00062942504881, 39.74072235994946],
                        [-105.00020027160645, 39.74191033368865],
                        [-105.00071525573731, 39.74276830198601],
                        [-105.00097274780272, 39.74369225589818],
                        [-105.00097274780272, 39.74461619742136],
                        [-105.00123023986816, 39.74534214278395],
                        [-105.00183105468751, 39.74613407445653],
                        [-105.00432014465332, 39.74732195489861]
                    ],[
                    [-105.00361204147337, 39.74354376414072],
                    [-105.00301122665405, 39.74278480127163],
                    [-105.00221729278564, 39.74316428375108],
                    [-105.00283956527711, 39.74390674342741],
                    [-105.00361204147337, 39.74354376414072]
                ]
                ],[
                    [
                        [-105.00942707061768, 39.73989736613708],
                        [-105.00942707061768, 39.73910536278566],
                        [-105.00685214996338, 39.73923736397631],
                        [-105.00384807586671, 39.73910536278566],
                        [-105.00174522399902, 39.73903936209552],
                        [-105.00041484832764, 39.73910536278566],
                        [-105.00041484832764, 39.73979836621592],
                        [-105.00535011291504, 39.73986436617916],
                        [-105.00942707061768, 39.73989736613708]
                    ]
                ]
            ]
        }
    };
    public map;
    public tile;
    public dat;
    ngAfterContentInit() {
        this.map = L.map('map').setView([39.74739, -105], 13);
        this.tile = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.light'
        }).addTo(this.map);
        this.dat = L.geoJson([this.bicycleRental, this.campus], {

            style: function (feature) {
                return feature.properties && feature.properties.style;
            },


            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(this.map);
    }
}