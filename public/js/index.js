const trs = document.querySelectorAll('tbody tr');
const form = document.getElementById('form');
const submit = document.getElementById('submit');



[...trs].forEach(tr => {
    tr.addEventListener('click', (e) => {
        // console.log(e.target.dataset.id);

        if (tr.id === e.target.dataset.id) {
            submit.innerText = "Update";
            form.action = "/updateTask";
            
            [...tr.children].forEach(td => {
                // console.log(td);
                if (td.className === "taskname") {
                    // console.log(td);
                    form[0].value = td.textContent;
                }

                if (td.className === "priority") {
                    form[1].selectedIndex = td.textContent === "high" ? 1 : td.textContent === "medium" ? 2 : td.textContent === "low" ? 3 : 0
                }

                if (td.className === "date") {
                    form[2].value = new Date(td.textContent).toISOString().slice(0, 10);
                }

                form[3].value = tr.id;
            })
        }
    })
})