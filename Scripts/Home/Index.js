document.addEventListener("DOMContentLoaded", function() {
	var r = document.querySelectorAll("input[name='r']");
	let time = Date.now();
	let lastScrollUpdate = time;
	let next = 1;
	let reversing = false;

	r.forEach(function(i, idx) {
		r[idx].addEventListener("click", function() {
			lastScrollUpdate = time;
			time = Date.now();

			if(idx == 4) {
				next = 3;
				reversing = true;
			}
			else if(idx == 0) {
				next = 1;
				reversing = false;
			}
			else {
				if(reversing) next = idx - 1;
				else next = idx + 1;
			}
		});
	});

	function doTask() {
		if((Date.now() - time) >= 7000) {
			lastScrollUpdate = time;
			time = Date.now();
			r[next].checked = true;

			if(reversing == false) {
				if(next == 4) {
					next = 3;
					reversing = true;
				}
				else next += 1;
			}
			else {
				if(next == 0) {
					next = 1;
					reversing = false;
				}
				else next -= 1;
			}
		}
		
		if((Date.now() - lastScrollUpdate) >= 500) lastScrollUpdate = Date.now()
		setTimeout(doTask, 500);
	}

	doTask();
});