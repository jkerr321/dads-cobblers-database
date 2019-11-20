// Homepage functionality
if (document.querySelector('.js-modal')) {
    const modal = document.querySelector('.js-modal');
    const modalContentInfo = document.querySelector('.js-modal-content-info');
    const modalContentForm = document.querySelector('.js-modal-content-form');
    const table = document.querySelector('.js-table');
    const garden = document.querySelector('.garden')
    const plants = garden.querySelectorAll('[data-is-filled=true]');
    const emptyItems = garden.querySelectorAll('[data-is-filled=false]');
    const toggleButton = document.querySelector('.js-button-toggle-view');
    const formColour = document.querySelector('.js-form-colour');

    //TODO surely this and showPlant Modal can be DRYed out
    const toggleView = () => {
        if (table.classList.contains('hidden')) {
            table.classList.remove('hidden');
            modal.classList.add('hidden');
        } else {
            modal.classList.remove('hidden');
            table.classList.add('hidden');
        }
    }

    // NB Alas this isn't merged with functionality in toggleView because the modal is shown on load
    const showPlantModal = (event, plant) => {
        // hide table if it's in view
        if (!table.classList.contains('hidden')) {
            table.classList.add('hidden');
        }
        populatePlantData(event);
        modal.classList.remove('hidden');
    }

    const populatePlantData = (event) => {
        // get plant info from data attrs
        const commonName = event.srcElement.attributes['data-common-name'].value;
        const latinName = event.srcElement.attributes['data-latin-name'].value;
        const perennialAnnual = event.srcElement.attributes['data-perennial-annual'].value;
        const image = event.srcElement.attributes['data-image'].value;
        const plantedDate = event.srcElement.attributes['data-planted-date'].value;
        const link = event.srcElement.attributes['data-link'].value;
        const colour = event.srcElement.attributes['data-colour'].value;
        const notes = event.srcElement.attributes['data-notes'].value;
        const position = event.srcElement.attributes['data-position'].value;

        // get modal divs that we want to insert data into
        const modalCommonName = document.querySelector('.js-modal-common-name');
        const modalLatinName = document.querySelector('.js-modal-latin-name');
        const modalPerennialAnnual = document.querySelector('.js-modal-perennial-annual');
        const modalImage = document.querySelector('.js-modal-image');
        const modalPlantedDate = document.querySelector('.js-modal-planted-date');
        const modalLink = document.querySelector('.js-modal-link');
        const modalNotes = document.querySelector('.js-modal-notes');

        // get form divs that we want to insert data into
        const formCommonName = document.querySelector('.js-form-common-name');
        const formLatinName = document.querySelector('.js-form-latin-name');
        const formPerennialAnnual = document.querySelector('.js-form-perennial-annual');
        const formColour = document.querySelector('.js-form-colour');
        const formColourOptions = formColour.querySelectorAll('option');
        const formImage = document.querySelector('.js-form-image');
        const formPlantedDate = document.querySelector('.js-form-planted-date');
        const formLink = document.querySelector('.js-form-link');
        const formNotes = document.querySelector('.js-form-notes');
        const formPosition = document.querySelector('.js-form-position');

        // set form placeholder values
        formCommonName.placeholder = commonName || '';
        formLatinName.placeholder = latinName || '';
        formPerennialAnnual.placeholder = perennialAnnual || '';
        formImage.placeholder = image || '';
        formPlantedDate.placeholder = plantedDate || '';
        formLink.placeholder = link || '';
        formNotes.placeholder = notes || '';
        formPosition.value = position || '';

        // remove currently selected default colour value and update to current plant colour
        for (let i = 0; i < formColour.options.length; i++) {
            formColour.options[i].removeAttribute('selected');
        }
        for (let i = 0; i < formColour.options.length; i++) {
            if (formColour.options[i].value.toLowerCase() === colour.toLowerCase()) {
                formColour.options[i].setAttribute('selected', '');
            }
        }
        
        // update modal with plant info
        modalCommonName.innerHTML = commonName || '';
        modalLatinName.innerHTML = latinName || '';
        modalNotes.innerHTML = notes || '';

        changeBorderColour(colour);

        if (plantedDate) {
            modalPlantedDate.innerHTML = `Planted ${plantedDate}`;
        } else {
            modalPlantedDate.innerHTML = '';
        }

        if (perennialAnnual === 'P') {
            modalPerennialAnnual.innerHTML = 'Perennial';
        } else if (perennialAnnual === 'A') {
            modalPerennialAnnual.innerHTML = 'Annual';
        } else {
            modalPerennialAnnual.innerHTML = '';
        }

        if (image) {
            modalImage.innerHTML = `<img src=${image}>`;
        } else {
            modalImage.innerHTML = '';
        }

        if (link) {
            modalLink.innerHTML = `<a href=${link} target="_blank">RHS link</a>`;
        } else {
            modalLink.innerHTML = '';
        }
    };

    const changeBorderColour = newColour => {
        modalContentInfo.setAttribute('style', `border: 20px solid ${newColour}`)
        modalContentForm.setAttribute('style', `border: 20px solid ${newColour}`)
    }

    //make this more functional - at least pass in form colour - is it being used elsewhere? If not contain it here
    const changeFormColour = () => {
        for (let i = 0; i < formColour.options.length; i++) {
            if (formColour.options[i].selected) {
                changeBorderColour(formColour.options[i].value);
            }
        }
    }

    plants.forEach(plant => plant.addEventListener("click", e => showPlantModal(e, plant)));
    toggleButton.addEventListener('click', toggleView);
    formColour.addEventListener('change', changeFormColour);
}

// Photo modal functionality for gallery page
if (document.querySelector('.js-photo-modal')) {
    const modal = document.querySelector('.js-photo-modal');
    const modalContent = document.querySelector('.js-photo-modal-content');
    const photos = Array.from(document.querySelector('.js-gallery-container').querySelectorAll('.photo'));
    const close = modal.querySelector('.js-close');

    photos.forEach(photo => photo.addEventListener('click', (e) => {
        modal.classList.remove('hidden');
        modalContent.src = e.srcElement.src;
    }));

    // close modal when anywhere on screen is clicked apart from the image itself
    close.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', () => modal.classList.add('hidden'));
    modalContent.addEventListener('click', (e) => e.stopPropagation());
}
