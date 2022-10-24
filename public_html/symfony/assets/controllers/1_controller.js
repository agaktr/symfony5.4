import { Controller } from '@hotwired/stimulus';
import {frog} from "../js/frog";
import {viewportFix} from "../js/viewport";
import {Geolocation} from "../js/geolocation";

export default class extends Controller {
    connect() {

        frog()
        viewportFix()
        window.GPS = Geolocation
    }
}