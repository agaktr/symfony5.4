import { Controller } from '@hotwired/stimulus';
import {frog} from "../js/frog";
import {viewportFix} from "../js/viewport";

export default class extends Controller {
    connect() {

        frog()
        viewportFix()
    }
}
