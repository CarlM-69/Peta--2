const enroll_form = document.querySelector("#enroll-form");
const enroll_given_name = document.querySelector("#given-name-input");
const enroll_surname = document.querySelector("#surname-input");
const enroll_middle_name = document.querySelector("#middle-name-input");
const enroll_sex = document.querySelector("#sex-input");
const enroll_bday = document.querySelector("#bday-input");
const enroll_number = document.querySelector("#number-input");
const enroll_mother = document.querySelector("#mother-input");
const enroll_father = document.querySelector("#father-input");
const enroll_current_address = document.querySelector("#current-address-input");
const enroll_same_as_current = document.querySelector("#same-as-current-input");
const enroll_permanent_address = document.querySelector("#permanent-address-input");
const enroll_permanent_address_label = document.querySelector("#permanent-address-input-label");
const enroll_1x1 = document.querySelector("#_1x1-input");
const enroll_bcert = document.querySelector("#bcert-input");
const enroll_form137 = document.querySelector("#form137-input");
const notification_container = document.querySelector("#notif-container");
const notifs = [];
let submit_debounce = false;

function createNotif(title, message) {
	let newNotif = document.createElement("div");
	let generatedId = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
	newNotif.classList.add("notif-card");
	newNotif.classList.add("enroll-s_1-notif-show");

	function removeNotif(notif) {
		notif.classList.remove("enroll-s_1-notif-show");
		notif.classList.add("enroll-s_1-notif-hide");

		setTimeout(function() {
			var idx = notifs.indexOf(notif);
			if(idx != -1) { notifs.splice(idx, 1); }

			notif.remove();
		}, 550);
	}

	if(notifs.length >= 5) {
		let last_item = notifs[notifs.length-1];

		removeNotif(last_item);
	}

	notifs.unshift(newNotif);
	newNotif.innerHTML = `
		<img src="../../Resources/Icons/exclamation.svg">
		<div class="text_content">
			<span>${ title }</span>
			<span>${ message }</span>
		</div>
		<div class="exit" id="notif-exit${ generatedId }">
			<img src="../../Resources/Icons/xmark.svg">	
		</div>
	`;
	notification_container.appendChild(newNotif);
	const notif_exit = document.querySelector(`#notif-exit${ generatedId }`);

	notif_exit.addEventListener("click", function() {
		removeNotif(newNotif);
	});

	setTimeout(function() {
		removeNotif(newNotif);
	}, 7000);
}


// Magic
window.addEventListener("DOMContentLoaded", function() {
	enroll_same_as_current.addEventListener("change", function() {
		if(enroll_same_as_current.checked) {
			enroll_permanent_address.setAttribute("disabled", true);
			enroll_permanent_address_label.style.opacity = 0.5;
		}
		else {
			enroll_permanent_address.removeAttribute("disabled");
			enroll_permanent_address_label.style.opacity = 1;
		}
	});

	enroll_form.addEventListener("submit", function(event) {
		event.preventDefault();

		if(!submit_debounce) {
			submit_debounce = true;

			setTimeout(function() {
				submit_debounce = false;
			}, 650);
		}
		else return;

		if(enroll_given_name.value.length <= 0) {
			createNotif(
				"Your given name",
				"We would like to know you!"
			);
			return;
		}

		if(enroll_surname.value.length <= 0) {
			createNotif(
				"A family name",
				"We want to know your surname."
			);
			return;
		}

		if(enroll_sex.value.length <= 0) {
			createNotif(
				"Your sex",
				"Are you a male or a female?"
			);
			return;
		}

		if(enroll_bday.value.length <= 0) {
			createNotif(
				"Is it your birthday?",
				"When were you born?"
			);
			return;
		}

		if(enroll_number.value.length <= 0) {
			createNotif(
				"Contact Number",
				"We need this for communication."
			);
			return;
		}

		if(enroll_mother.value.length <= 0 && enroll_father.value.length <= 0) {
			createNotif(
				"A Guardian",
				"You need atleast one parent (or a guardian)."
			);
			return;
		}

		if(enroll_current_address.value.length <= 0) {
			createNotif(	
				"Your home",
				"Where do you live?"
			);
			return;
		}

		if(enroll_same_as_current.checked == false) {
			if(enroll_current_address.value.length <= 0) {
				createNotif(
					"Your permanent home",
					"Where do you permanently live?"
				);
				return;
			}
		}

		if(enroll_1x1.files.length <= 0) {
			createNotif(	
				"Your picture",
				"A 1x1 is required in enrollment."
			);
			return;
		}

		if(enroll_bcert.files.length <= 0) {
			createNotif(	
				"Your Identity",
				"Upload your birth certificate."
			);
			return;
		}

		if(enroll_form137.files.length <= 0) {
			createNotif(	
				"Your Identity",
				"We need your grade 10 form 137."
			);
			return;
		}

        window.location.href = "./Success.html";
	});
});