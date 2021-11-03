document.querySelectorAll("aside.row #actions button").forEach(button => {
    button.addEventListener("click", () => {
        const id = button.classList[0];
        document.querySelectorAll(`aside.row #actions button:not(.${id})`).forEach(notButton => {
            notButton.classList.remove("active");
        });
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        } else {
            button.classList.add("active");
        }
        document.querySelectorAll(`aside.row #forms form:not(#${id})`).forEach(form => {
            form.classList.remove("show");
        });
        if (document.querySelector(`aside.row #forms form#${id}`).classList.contains("show")) {
            document.querySelector(`aside.row #forms form#${id}`).classList.remove("show")
        } else {
            document.querySelector(`aside.row #forms form#${id}`).classList.add("show");
        }
    });
});