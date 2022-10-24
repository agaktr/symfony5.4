import { Controller } from '@hotwired/stimulus';
import {frog,viewportFix} from "../js/utility";

export default class extends Controller {
    connect() {

        frog()
        viewportFix()
    }
}
