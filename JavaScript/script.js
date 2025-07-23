const scroll = new LocomotiveScroll({
    el: document.querySelector('body'),
    smooth: true
});

const letsGoBtn = document.querySelector(".letsgo");
const chapterSelect = document.querySelector(".chapter-select");
const warningSpan = document.querySelector(".span");

// Add event listener to chapter select dropdown
chapterSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    if (selectedValue && selectedValue.startsWith('chapter')) {
        window.location.href = `${selectedValue}.html`;
    }
});

//your searchable content
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const suggestionsBox = document.querySelector('.search-suggestions');
    
    const searchableContent = [
        "Chapter 1: Introduction",
        "Chapter 2: Basics",
        "Chapter 3: Advanced Topics",
        "Mathematics",
        "Physics",
        "Chemistry"
    ];

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        suggestionsBox.innerHTML = '';

        if (searchTerm.length > 0) {
            const matches = searchableContent.filter(item => 
                item.toLowerCase().includes(searchTerm)
            );

            if (matches.length > 0) {
                suggestionsBox.classList.add('active');
                matches.forEach(match => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = match;
                    div.addEventListener('click', () => {
                        searchBar.value = match;
                        suggestionsBox.classList.remove('active');
                    });
                    suggestionsBox.appendChild(div);
                });
            } else {
                suggestionsBox.classList.remove('active');
            }
        } else {
            suggestionsBox.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.classList.remove('active');
        }
    });
});


    
//header and nav js 

const cards = document.querySelectorAll(".card");
//main body of home js


letsGoBtn.addEventListener("click", () => {
    const selectedValue = chapterSelect.value;

    if (selectedValue.startsWith("chapter")) {
        warningSpan.style.display = "none";
        window.location.href = `${selectedValue}.html`;
    } else {
        warningSpan.style.display = "block";
    }
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on card index
            setTimeout(() => {
                entry.target.classList.add("show");
            }, 150 * index);
        }
    });
},
{
    threshold: 0.2,
});

cards.forEach(card => {
    observer.observe(card);
});

// Add hover effect interactions for better performance
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.emoji').style.animation = 'bounce 0.6s ease infinite alternate';
        card.querySelector('h3').style.color = 'var(--accent)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.emoji').style.animation = '';
        card.querySelector('h3').style.color = 'var(--text)';
    });
});

