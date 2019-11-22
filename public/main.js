// Homepage functionality
if (document.querySelector('.js-modal')) {
    const modal = document.querySelector('.js-modal');
    const modalContentInfo = document.querySelector('.js-modal-content-info');
    const modalContentForm = document.querySelector('.js-modal-content-form');
    const table = document.querySelector('.js-table');
    const garden = document.querySelector('.garden')
    const plants = garden.querySelectorAll('.js-grid-plant');
    const toggleButton = document.querySelector('.js-button-toggle-view');
    const formColour = document.querySelector('.js-form-colour');
    const editButton = document.querySelector('.js-modal-edit-button');

    const hideInitialModal = () => {
        const modalContentInitial = document.querySelector('.js-modal-initial');
        if (!modalContentInitial.classList.contains('hidden')) {
            modalContentInitial.classList.add('hidden')
        }
    }

    //TODO surely this and showPlant Modal can be DRYed out
    const toggleView = () => {
        hideInitialModal();
        if (table.classList.contains('hidden')) {
            table.classList.remove('hidden');
            modal.classList.add('hidden');
        } else {
            modal.classList.remove('hidden');
            table.classList.add('hidden');
        }
    }

    const getPlantData = (event) => {
        return {
            commonName: event.srcElement.attributes['data-common-name'].value,
            latinName: event.srcElement.attributes['data-latin-name'].value,
            perennialAnnual: event.srcElement.attributes['data-perennial-annual'].value,
            image: event.srcElement.attributes['data-image'].value,
            plantedDate: event.srcElement.attributes['data-planted-date'].value,
            link: event.srcElement.attributes['data-link'].value,
            colour: event.srcElement.attributes['data-colour'].value,
            notes: event.srcElement.attributes['data-notes'].value,
            position: event.srcElement.attributes['data-position'].value,
            isFilled: event.srcElement.attributes['data-is-filled'].value
        }
    }

    // NB Alas this isn't merged with functionality in toggleView because the modal is shown on load
    const showPlantModal = (event) => {
        hideInitialModal();
        const plantInfo = getPlantData(event);
        populatePlantData(plantInfo);
        populateForm(plantInfo);
        plantInfo.isFilled === 'true' ? showPlantInfo() : showForm();
        // hide table if it's in view
        if (!table.classList.contains('hidden')) {
            table.classList.add('hidden');
        }
        modal.classList.remove('hidden');
    }

    const populatePlantData = (plantInfo) => {
        changeBorderColour(plantInfo.colour);

        // get modal divs that we want to insert data into
        const modalCommonName = document.querySelector('.js-modal-common-name');
        const modalLatinName = document.querySelector('.js-modal-latin-name');
        const modalPerennialAnnual = document.querySelector('.js-modal-perennial-annual');
        const modalImage = document.querySelector('.js-modal-image');
        const modalPlantedDate = document.querySelector('.js-modal-planted-date');
        const modalLink = document.querySelector('.js-modal-link');
        const modalNotes = document.querySelector('.js-modal-notes');
        
        // update modal with plant info
        modalCommonName.innerHTML = plantInfo.commonName || '';
        modalLatinName.innerHTML = plantInfo.latinName || '';
        modalNotes.innerHTML = plantInfo.notes || '';

        if (plantInfo.plantedDate) {
            modalPlantedDate.innerHTML = `Planted ${plantInfo.plantedDate}`;
        } else {
            modalPlantedDate.innerHTML = '';
        }

        if (plantInfo.perennialAnnual === 'P') {
            modalPerennialAnnual.innerHTML = 'Perennial';
        } else if (plantInfo.perennialAnnual === 'A') {
            modalPerennialAnnual.innerHTML = 'Annual';
        } else {
            modalPerennialAnnual.innerHTML = '';
        }

        if (plantInfo.image) {
            modalImage.innerHTML = `<img src=${plantInfo.image}>`;
        } else {
            modalImage.innerHTML = '';
        }

        if (plantInfo.link) {
            modalLink.innerHTML = `<a href=${plantInfo.link} target="_blank">RHS link</a>`;
        } else {
            modalLink.innerHTML = '';
        }

    };

    const populateForm = (plantInfo) => {
        // get form divs that we want to insert data into
        const formTitle = document.querySelector('.js-form-title');
        const formCommonName = document.querySelector('.js-form-common-name');
        const formLatinName = document.querySelector('.js-form-latin-name');
        const formAnnual = document.querySelector('.js-form-annual');
        const formPerennial = document.querySelector('.js-form-perennial');
        const formColour = document.querySelector('.js-form-colour');
        const formColourOptions = formColour.querySelectorAll('option');
        const formImage = document.querySelector('.js-form-image');
        const formPlantedDate = document.querySelector('.js-form-planted-date');
        const formLink = document.querySelector('.js-form-link');
        const formNotes = document.querySelector('.js-form-notes');
        const formPosition = document.querySelector('.js-form-position');
        
        changeBorderColour(plantInfo.colour);

        // set form placeholder values
        formTitle.innerHTML = plantInfo.position || '';
        formCommonName.placeholder = plantInfo.commonName || '';
        formLatinName.placeholder = plantInfo.latinName || '';
        formImage.placeholder = plantInfo.image || '';
        formPlantedDate.placeholder = plantInfo.plantedDate || '';
        formLink.placeholder = plantInfo.link || '';
        formNotes.placeholder = plantInfo.notes || '';
        formPosition.value = plantInfo.position || '';

        // remove current radio button selection
        formPerennial.removeAttribute('checked');
        formAnnual.removeAttribute('checked');

        if (plantInfo.perennialAnnual === 'P') formPerennial.setAttribute('checked', '');
        if (plantInfo.perennialAnnual === 'A') formAnnual.setAttribute('checked', '');

        // remove currently selected default colour value and update to current plant colour
        for (let i = 0; i < formColour.options.length; i++) {
            formColour.options[i].removeAttribute('selected');
        }
        for (let i = 0; i < formColour.options.length; i++) {
            if (formColour.options[i].value.toLowerCase() === plantInfo.colour.toLowerCase()) {
                formColour.options[i].setAttribute('selected', '');
            }
        }
    }

    const showForm = () => {
        modalContentForm.classList.remove('hidden');
        modalContentInfo.classList.add('hidden');
    }

    const showPlantInfo = () => {
        modalContentInfo.classList.remove('hidden');
        modalContentForm.classList.add('hidden');
    }

    const changeBorderColour = newColour => {
        if(newColour) {
            modalContentInfo.setAttribute('style', `border: 20px solid ${newColour}`)
            modalContentForm.setAttribute('style', `border: 20px solid ${newColour}`)
        } else {
            // remove previously set colour so form goes back to default border colour
            modalContentForm.removeAttribute('style');
        }
    }

    //make this more functional - at least pass in form colour - is it being used elsewhere? If not contain it here
    const changeFormColour = () => {
        for (let i = 0; i < formColour.options.length; i++) {
            if (formColour.options[i].selected) {
                changeBorderColour(formColour.options[i].value);
            }
        }
    }

    plants.forEach(plant => plant.addEventListener('click', e => showPlantModal(e)));
    editButton.addEventListener('click', e => showForm(e));
    toggleButton.addEventListener('click', toggleView);
    formColour.addEventListener('change', changeFormColour);
}

// Photo modal functionality for gallery page
if (document.querySelector('.js-photo-modal')) {
    const photoModal = document.querySelector('.js-photo-modal');
    const modalContent = document.querySelector('.js-photo-modal-content');
    const photos = Array.from(document.querySelector('.js-gallery-container').querySelectorAll('.photo'));
    const close = photoModal.querySelector('.js-close');

    photos.forEach(photo => photo.addEventListener('click', (e) => {
        photoModal.classList.remove('hidden');
        modalContent.src = e.srcElement.src;
    }));

    // close modal when anywhere on screen is clicked apart from the image itself
    close.addEventListener('click', () => photoModal.classList.add('hidden'));
    photoModal.addEventListener('click', () => photoModal.classList.add('hidden'));
    modalContent.addEventListener('click', (e) => e.stopPropagation());
}
