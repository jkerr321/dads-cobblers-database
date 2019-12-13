// Homepage functionality
if (document.querySelector('.js-modal')) {
	const modal = document.querySelector('.js-modal');
	const modalContentInfo = document.querySelector('.js-modal-content-info');
	const modalContentForm = document.querySelector('.js-modal-content-form');
	const modalEditable = document.querySelector('.js-modal-content-editable');
	const matches = document.querySelectorAll('.js-grid-match');
	const editButton = document.querySelector('.js-modal-edit-button');
	const tableToggles = document.querySelectorAll('.js-table-toggle');
	const wantToggles = document.querySelectorAll('.js-wants-toggle');
	const filterToggle = document.querySelector('.js-filter-toggle');

	const hide = (element) => element.classList.add('hidden');
	const show = (element) => element.classList.remove('hidden');

	const getModalData = (event) => {
		return {
			season: event.srcElement.attributes['data-season'].value,
			league: event.srcElement.attributes['data-league'].value,
			date: event.srcElement.attributes['data-date'].value,
			opponent: event.srcElement.attributes['data-opponent'].value,
			homeAway: event.srcElement.attributes['data-home-away'].value,
			score: event.srcElement.attributes['data-score'].value,
			competition: event.srcElement.attributes['data-competition'].value,
			matchNotes: event.srcElement.attributes['data-match-notes'].value,
			gotWant: event.srcElement.attributes['data-got-want'].value,
			price: event.srcElement.attributes['data-price'].value,
			notes: event.srcElement.attributes['data-notes'].value,
			id: event.srcElement.attributes['data-id'].value
		};
	};

	const showInfoModal = (event) => {
		const modalInfo = getModalData(event);
		populateModalData(modalInfo);
		const season = getSeasonContainer(event);
		season.appendChild(modal);
		populateForm(modalInfo);
		hideForm();
		showModalInfo();
		show(modal);
	};

	const populateModalData = (modalInfo) => {
		//TODO DRY?
		// get modal divs that we want to insert data into
		const modalSeason = document.querySelector('.js-modal-season');
		const modalLeague = document.querySelector('.js-modal-league');
		const modalDate = document.querySelector('.js-modal-date');
		const modalOpponent = document.querySelector('.js-modal-opponent');
		const modalHomeAway = document.querySelector('.js-modal-home_away');
		const modalScore = document.querySelector('.js-modal-score');
		const modalCompetition = document.querySelector('.js-modal-competition');
		const modalMatchNotes = document.querySelector('.js-modal-match_notes');
		const modalGotWant = document.querySelector('.js-modal-got_want');
		const modalPrice = document.querySelector('.js-modal-price');
		const modalNotes = document.querySelector('.js-modal-notes');

		// update modal with plant info
		modalSeason.innerHTML = modalInfo.season || '';
		modalLeague.innerHTML = modalInfo.league || '';
		modalDate.innerHTML = modalInfo.date || '';
		modalOpponent.innerHTML = modalInfo.opponent || '';
		modalHomeAway.innerHTML = modalInfo.homeAway || '';
		modalScore.innerHTML = modalInfo.score || '';
		modalCompetition.innerHTML = modalInfo.competition || '';
		modalGotWant.innerHTML = modalInfo.gotWant || '';

		//TODO DRY create func for this
		if (modalInfo.matchNotes) {
			modalMatchNotes.innerHTML = `Match Notes: ${modalInfo.matchNotes}`;
		} else {
			modalMatchNotes.innerHTML = '';
		}

		if (modalInfo.price) {
			modalPrice.innerHTML = `Programme Price: ${modalInfo.price}`;
		} else {
			modalPrice.innerHTML = '';
		}

		if (modalInfo.notes) {
			modalNotes.innerHTML = `Programme Notes: ${modalInfo.notes}`;
		} else {
			modalNotes.innerHTML = '';
		}

	};

	const populateForm = (modalInfo) => {
		// get form divs that we want to insert data into
		const formWant = document.querySelector('.js-form-want');
		const formGot = document.querySelector('.js-form-got');
		const formNotes = document.querySelector('.js-form-notes');
		const formPrice = document.querySelector('.js-form-price');
		const formId = document.querySelector('.js-form-id');

		// set form placeholder values
		formPrice.placeholder = modalInfo.price || '';
		formNotes.placeholder = modalInfo.notes || '';
		formId.value = modalInfo.id || '';

		// remove current radio button selection
		formGot.removeAttribute('checked');
		formWant.removeAttribute('checked');

		if (modalInfo.gotWant === 'got') {
			formGot.setAttribute('checked', '');
		} else {
			formWant.setAttribute('checked', '');
		}
	};

	const showForm = () => {
		show(modalContentForm);
		hide(modalEditable);
	};

	const hideForm = () => {
		hide(modalContentForm);
		show(modalEditable);
	};

	const showModalInfo = () => {
		show(modalContentInfo);
		hide(modalContentForm);
	};

	const hideModal = () => {
		if (!modal.classList.contains('hidden')) {
			hide(modal);
		}
	};

	//TODO dry out toggle functions - can they be abstracted?
	const toggleFilter = (event) => {
		toggleSpan(event.srcElement);
		const filter = document.querySelector('.js-filter-form');
		if(filter.classList.contains('hidden')) {
			show(filter);
		} else {
			hide(filter);
		}
	};

	const toggleSpan = (srcElement) => {
		hide(srcElement);
		if (srcElement.nextElementSibling) {
			show(srcElement.nextElementSibling);
		} else {
			show(srcElement.previousElementSibling);
		}
	};

	const getSeasonContainer = (event) => {
		let seasonContainer;
		let element = event.target;
		while (element) {
			if (element.dataset && element.dataset.seasonString) {
				seasonContainer = element;
				break;
			} else {
				element = element.parentElement;
			}
		}
		return seasonContainer;
	};

	const toggleWants = (event) => {
		toggleSpan(event.srcElement);
		const seasonContainer = getSeasonContainer(event);
		const matchCells = seasonContainer.querySelectorAll('td');

		if (event.srcElement.classList.contains('js-show-wants')) {
			matchCells.forEach(cell => {
				if (cell.innerHTML === 'Got') {
					//TODO is this a better way of doing some of the other stuff?
					hide(cell.parentNode);
				}
			});
		} else {
			matchCells.forEach(cell => show(cell.parentNode));
		}
	};

	const toggleTable = (event) => {
		hideModal();
		const seasonContainer = getSeasonContainer(event);
		const table = seasonContainer.querySelector('.js-games-table');
		const dots = seasonContainer.querySelector('.js-games-dots');
		const wantsToggle = seasonContainer.querySelector('.js-wants-toggle');
		const showAllSpan = seasonContainer.querySelector('.js-show-all');

		if (event.srcElement.classList.contains('js-show-more')) {
			hide(dots);
			show(table);
			if (wantsToggle) {
				show(wantsToggle); 
			}
		} else {
			if (wantsToggle) {
				hide(wantsToggle);
			}
			hide(table);
			show(dots);
			
			// when hiding table also unfilter 'wants' back to full list
			toggleWants(event);
			toggleSpan(showAllSpan);
		}

		toggleSpan(event.srcElement);
	};

	matches.forEach(match => match.addEventListener('click', e => showInfoModal(e)));
	tableToggles.forEach(toggle => toggle.addEventListener('click', e => toggleTable(e)));
	wantToggles.forEach(toggle => toggle.addEventListener('click', e => toggleWants(e)));
	editButton.addEventListener('click', e => showForm(e));
	filterToggle.addEventListener('click', e => toggleFilter(e));
}
