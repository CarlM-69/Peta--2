document.addEventListener("DOMContentLoaded", function() {
    var r = document.querySelectorAll("input[name='r']");
    let time = Date.now();
    let lastScrollUpdate = time;
    let next = 1;
    let reversing = false;

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
                else {
                    next += 1;
                }
            }
            else {
                if(next == 0) {
                    next = 1;
                    reversing = false;
                }
                else {
                    next -= 1;
                }
            }
        }
        
        if((Date.now() - lastScrollUpdate) >= 500) {
            lastScrollUpdate = Date.now()
        }

        setTimeout(doTask, 500);
    }

    doTask();
});