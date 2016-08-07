import {Component} from "angular2/core";
import {MapsComponent} from "./maps/maps.component";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.component.css'],
    directives : [MapsComponent]
})
export class AppComponent {
}