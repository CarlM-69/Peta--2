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
	enroll_form.addEventListener("submit", function(event) {
		event.preventDefault();

		if(!submit_debounce) {
			submit_debounce = true;

			setTimeout(function() {
				submit_debounce = false;
			}, 650);
		}
		else return;

		if(contact_email.value.length <= 0) {
			createNotif(
				"Email is necessary!",
				"We reply on the email you provide."
			);
			return;
		}

        var email_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
    	var is_email_valid = email_pattern.test(contact_email.value);

		if(!is_email_valid) {
			createNotif(
				"Invalid Email",
				"Make sure your email is correct."
			);
			return;
		}
		else {
			var email = contact_email.value.toLowerCase();
			let valid_email = false;
			const validEmails = [
				"@gmail.com",
				"@yahoo.com",
				"@outlook.com",
				"@hotmail.com",
				"@depedqc.ph",
				"@ncr2.deped.gov.ph",
				"@gov.deped.ph",
				"@deped.gov.ph",
				"@deped.ph",
				"@deped.gov.ph",
				".deped.gov.ph"
			];

			for(let i = 0; i < validEmails.length; i++) {
				if(email.includes(validEmails[i])) {
					valid_email = true;
				}
			}

			if(!valid_email) {
				createNotif(
					"Invalid Email",
					"Make sure your email is correct."
				);
				return;
			}
		}

		if(contact_concern.value.length <= 0) {
			createNotif(
				"Your Concern",
				"You can't get a help without a concern."
			);
			return;
		}

        window.location.href = "./Success.html";
	});
});