const letsGoBtn = document.querySelector(".letsgo");
const chapterSelect = document.querySelector(".chapter-select");
const warningSpan = document.querySelector(".span");

//header and nav js 

const cards = document.querySelectorAll(".card");
//main body of home js


letsGoBtn.addEventListener("click", () => {
    let selectedchapter = chapterSelect;
    const selectValue = chapterSelect.value;

    if (chapterSelect.value.startsWith("chapter")) {
        warningSpan.style.display = "none";

         window.location.href = `${selectedchapter}.html`;
    } else {
        warningSpan.style.display = "block";
    };
    if (selectValue) {
        window.location.href = selectValue + ".html";
    } 
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
},
{
    threshold: 0.2,
});

cards.forEach(card => {
    observer.observe(card);
});

