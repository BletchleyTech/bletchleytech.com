document.querySelectorAll("h3.question").forEach((question) => {
    question.addEventListener("click", () => {
        if (question.classList.contains("active")) {
            question.classList.remove("active");
            question.children[0].innerHTML = "&#x25BE";
        } else {
            if (document.querySelector("h3.question.active")) {
                const active = document.querySelector("h3.question.active");
                active.classList.remove("active");
                active.children[0].innerHTML ="&#x25BE";
            }
            question.classList.add("active");
            question.children[0].innerHTML = "&#x25B4";
        }
    });
});