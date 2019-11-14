// Homepage functionality
if (document.querySelector('.js-modal')) {
    const modal = document.querySelector('.js-modal');
    const table = document.querySelector('.js-table');
    const plants = document.querySelectorAll('.js-grid-plant');
    const toggleButton = document.querySelector('.js-button-toggle-view');

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
        const position = event.srcElement.attributes['data-position'].value;

        // get modal divs that we want to insert data into
        const modalCommonName = document.querySelector('.js-modal-common-name');
        const modalLatinName = document.querySelector('.js-modal-latin-name');
        const modalPerennialAnnual = document.querySelector('.js-modal-perennial-annual');
        const modalImage = document.querySelector('.js-modal-image');
        const modalPlantedDate = document.querySelector('.js-modal-planted-date');
        const modalLink = document.querySelector('.js-modal-link');
        const modalContentInfo = document.querySelector('.js-modal-content-info');

        // get form divs that we want to insert data into
        const modalContentForm = document.querySelector('.js-modal-content-form');
        const formCommonName = document.querySelector('.js-form-common-name');
        const formLatinName = document.querySelector('.js-form-latin-name');
        const formPerennialAnnual = document.querySelector('.js-form-perennial-annual');
        const formColour = document.querySelector('.js-form-colour');
        const formImage = document.querySelector('.js-form-image');
        const formPlantedDate = document.querySelector('.js-form-planted-date');
        const formLink = document.querySelector('.js-form-link');
        const formPosition = document.querySelector('.js-form-position');

        // set form placeholder values
        formCommonName.placeholder = commonName || '';
        formLatinName.placeholder = latinName || '';
        formPerennialAnnual.placeholder = perennialAnnual || '';
        formColour.placeholder = colour || '';
        formImage.placeholder = image || '';
        formPlantedDate.placeholder = plantedDate || '';
        formLink.placeholder = link || '';
        formPosition.value = position || '';
        
        // update modal with plant info
        modalCommonName.innerHTML = commonName || '';
        modalLatinName.innerHTML = latinName || '';
    
        modalContentInfo.setAttribute('style', `border: 20px solid ${colour}`)
        modalContentForm.setAttribute('style', `border: 20px solid ${colour}`)

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

    plants.forEach(plant => plant.addEventListener("click", e => showPlantModal(e, plant)));
    toggleButton.addEventListener('click', toggleView);
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
