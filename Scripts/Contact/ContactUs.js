const contact_form = document.querySelector("#contact-form");
const contact_name = document.querySelector("#name-input");
const contact_email = document.querySelector("#email-input");
const contact_concern = document.querySelector("#concern-input");
const notification_container = document.querySelector("#notif-container");
const notifs = [];
let submit_debounce = false;

function createNotif(title, message) {
	let newNotif = document.createElement("div");
	let generatedId = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
	newNotif.classList.add("notif-card");
	newNotif.classList.add("contact-s_1-notif-show");

	function removeNotif(notif) {
		notif.classList.remove("contact-s_1-notif-show");
		notif.classList.add("contact-s_1-notif-hide");

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
	contact_form.addEventListener("submit", function(event) {
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