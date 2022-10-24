import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    connect () {

    }

    login(event) {
        event.preventDefault();

        const form = event.currentTarget.closest('form');
        const url = event.currentTarget.closest('[data-url]').dataset.url;

        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(form.serialize())
        })
            .then(res => res.json())
            .then(response => {


                console.log(response)
        })

    }

}
