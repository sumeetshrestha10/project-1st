// Quiz related variables
let correctAnswerCount = 0;
// Define questions by chapter
const questionsByChapter = {
    "1": [
        {
            question: "1. what is procedure oriented programming",
            options: [
                "a method of structuring code",
                "a random technique",
                "only OOP",
                "none of these",
            ],
            answer: "a method of structuring code",
        },
        {
            question: "2. What is OOP?",
            options: [
                "Object Oriented Programming",
                "Old Oriented Programming",
                "Oranixed Order Programming",
                "none of these",
            ],
            answer: "Object Oriented Programming",
        },
        {
            question: "3. What are the properties of OOP?",
            options: ["Encapsulation", "Inheritance", "Polymorphism", "All of these"],
            answer: "All of these",
        },
    ],
    "2": [
        {
            question: "1. Which keyword is used to define a class in JavaScript?",
            options: ["class", "function", "object", "prototype"],
            answer: "class",
        },
        {
            question: "2. What is a closure in JavaScript?",
            options: [
                "A function that can access variables from its outer scope",
                "A way to hide variables",
                "A built-in JavaScript method",
                "A type of loop",
            ],
            answer: "A function that can access variables from its outer scope",
        },
        {
            question: "3. What does the 'this' keyword refer to in JavaScript?",
            options: [
                "The current function",
                "The global object",
                "The object on which the method is called",
                "None of these",
            ],
            answer: "The object on which the method is called",
        },
    ],
    "3": [
        {
            question: "1. What is asynchronous programming?",
            options: [
                "Code that executes in parallel",
                "Code that runs in a separate thread",
                "Code that can continue executing while waiting for operations to complete",
                "None of these",
            ],
            answer: "Code that can continue executing while waiting for operations to complete",
        },
        {
            question: "2. What is a Promise in JavaScript?",
            options: [
                "A guarantee that a function will execute",
                "An object representing the eventual completion of an async operation",
                "A special type of function",
                "A JavaScript keyword",
            ],
            answer: "An object representing the eventual completion of an async operation",
        },
        {
            question: "3. What is the purpose of async/await?",
            options: [
                "To make code run faster",
                "To simplify working with Promises",
                "To create multithreaded JavaScript",
                "None of these",
            ],
            answer: "To simplify working with Promises",
        },
    ],
};

// Default questions in case chapter questions aren't found
const defaultQuestions = [
    {
        question: "1. What language is primarily used for web development?",
        options: ["JavaScript", "Python", "Java", "C++"],
        answer: "JavaScript",
    },
    {
        question: "2. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Method Language",
            "None of these",
        ],
        answer: "Hyper Text Markup Language",
    },
    {
        question: "3. What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Style Solution",
            "None of these",
        ],
        answer: "Cascading Style Sheets",
    },
];

let questions = defaultQuestions;
let currentQuestionIndex = 0;

// Add search bar functionality
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

    if (searchBar && suggestionsBox) {
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
    }
    
    // Load PDFs after DOM is loaded
    loadChapterPDFs();
});

// Function to load chapter-specific questions
function loadChapterQuestions() {
    const currentChapter = getCurrentChapter();
    console.log('Loading questions for chapter:', currentChapter);
    
    if (currentChapter && questionsByChapter[currentChapter]) {
        questions = questionsByChapter[currentChapter];
        console.log('Loaded chapter-specific questions');
    } else {
        questions = defaultQuestions;
        console.log('Using default questions (chapter not found or no specific questions)');
    }
}

// Function to get current chapter number
function getCurrentChapter() {
    const path = window.location.pathname;
    const match = path.match(/chapter(\d+)\.html/);
    return match ? match[1] : null;
}

// Function to load PDFs for the current chapter
function loadChapterPDFs() {
    const currentChapter = getCurrentChapter();
    console.log('Current chapter:', currentChapter);
    
    if (!currentChapter) {
        console.error('Could not determine current chapter');
        return;
    }

    // Load chapter-specific questions
    loadChapterQuestions();

    // Get PDFs from localStorage
    const pdfs = JSON.parse(localStorage.getItem('pdfs')) || [];
    console.log('All PDFs in storage:', pdfs.map(pdf => ({
        ...pdf,
        data: 'BASE64_DATA'
    })));

    // Filter PDFs for current chapter - Compare as strings
    const chapterPDFs = pdfs.filter(pdf => String(pdf.chapter) === String(currentChapter));
    console.log('PDFs for current chapter:', chapterPDFs.map(pdf => ({
        ...pdf,
        data: 'BASE64_DATA'
    })));

    // Get the container where PDF buttons will be added
    const pdfContainer = document.querySelector('.buttons');
    if (!pdfContainer) {
        console.error('PDF container not found');
        return;
    }

    // Clear existing buttons
    pdfContainer.innerHTML = '';

    // Add default PDF button
    const defaultPdfBtn = document.createElement('button');
    defaultPdfBtn.id = 'openPDFs';
    defaultPdfBtn.className = 'chapterbutton';
    defaultPdfBtn.textContent = 'Course Material';
    pdfContainer.appendChild(defaultPdfBtn);

    // Add Quiz button
    const quizBtn = document.createElement('button');
    quizBtn.id = 'startQuiz';
    quizBtn.className = 'chapterbtn';
    quizBtn.textContent = 'Take Quiz';
    pdfContainer.appendChild(quizBtn);

    // Add teacher-uploaded PDFs
    if (chapterPDFs.length > 0) {
        console.log('Adding teacher PDF buttons');
        chapterPDFs.forEach(pdf => {
            const button = document.createElement('button');
            button.className = 'chapterbutton';
            button.textContent = pdf.title;
            button.onclick = () => showTeacherPDF(pdf);
            pdfContainer.appendChild(button);
            console.log('Added button for PDF:', pdf.title);
        });
    } else {
        console.log('No teacher PDFs found for this chapter');
    }

    // Setup event listeners for PDF popup
    setupPDFPopupHandlers();
    
    // Setup quiz functionality after buttons are created
    setupQuiz();
}

// Function to show teacher-uploaded PDF in popup
function showTeacherPDF(pdf) {
    console.log('Showing teacher PDF:', pdf.title);
    const pdfPopup = document.getElementById('pdf-popup');
    const pdfFrame = document.getElementById('pdf-frame');
    
    if (pdfPopup && pdfFrame) {
        pdfFrame.src = pdf.data;
        pdfPopup.classList.add('show');
    } else {
        console.error('PDF popup elements not found');
    }
}

// Setup PDF popup event handlers
function setupPDFPopupHandlers() {
    const openPdfBtn = document.getElementById('openPDFs');
    const pdfPopup = document.getElementById('pdf-popup');
    const closePopup = document.getElementById('close-btn');
    const pdfFrame = document.getElementById('pdf-frame');

    if (openPdfBtn && pdfPopup && closePopup && pdfFrame) {
        openPdfBtn.addEventListener('click', () => {
            const currentChapter = getCurrentChapter();
            console.log('Opening default PDF for chapter:', currentChapter);
            pdfFrame.src = `PDFs/chapter${currentChapter}.pdf`;
            pdfPopup.classList.add('show');
        });

        closePopup.addEventListener('click', () => {
            console.log('Closing PDF popup');
            pdfPopup.classList.remove('show');
            setTimeout(() => {
                pdfFrame.src = '';
            }, 400);
        });
    } else {
        console.error('Some PDF popup elements are missing');
    }
}

// Setup quiz functionality
function setupQuiz() {
    const openQuizBtn = document.getElementById('startQuiz');
    const quizPopup = document.getElementById('quiz-popup');
    const closeQuizBtn = document.querySelector('.close-quiz');
    const questionContainer = document.querySelector('.quiz-question');
    const questionText = document.getElementById('question-text');
    const nextbtn = document.getElementById('next-btn');

    if (!openQuizBtn || !quizPopup || !closeQuizBtn || !questionContainer || !questionText || !nextbtn) {
        console.error('Some quiz elements are missing');
        return;
    }

    openQuizBtn.addEventListener('click', () => {
        // Log questions for debugging
        console.log("Opening quiz with", questions.length, "questions");
        questions.forEach((q, i) => {
            console.log(`Question ${i+1}:`, q.question);
        });
        
        currentQuestionIndex = 0;
        quizPopup.classList.add('show');
        showQuestion();
        correctAnswerCount = 0;
        document.getElementById('quiz-score').classList.add('hidden');
    });

    closeQuizBtn.addEventListener('click', () => {
        quizPopup.classList.remove('show');
        questionContainer.classList.remove('show');
        currentQuestionIndex = 0;
        document.getElementById('quiz-score').classList.add('hidden');
        
        // Clear any pending timeouts when closing
        if (window.quizTimeout) {
            clearTimeout(window.quizTimeout);
        }
    });

    // This button is now primarily for manual navigation if needed
    nextbtn.addEventListener('click', () => {
        // Clear any existing timeouts when manually navigating
        if (window.quizTimeout) {
            clearTimeout(window.quizTimeout);
        }
        
        currentQuestionIndex++;
        console.log("Next button clicked, new index:", currentQuestionIndex);
        if (currentQuestionIndex < questions.length) {
            console.log("Showing next question");
            showQuestion();
        } else {
            console.log("No more questions, finishing quiz");
            finishQuiz();
        }
    });
}

function showQuestion() {
    console.log("showQuestion called for index:", currentQuestionIndex);
    
    const questionContainer = document.querySelector('.quiz-question');
    questionContainer.classList.remove('show');
    questionContainer.classList.add('hidden');

    setTimeout(() => {
        const currentQuestion = questions[currentQuestionIndex];
        console.log("Displaying question:", currentQuestion.question);
        
        const questionText = document.getElementById('question-text');
        questionText.textContent = currentQuestion.question;

        const optionContainer = document.querySelector('.options-container');
        optionContainer.innerHTML = '';

        currentQuestion.options.forEach((option) => {
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option');
            optionBtn.textContent = option;
            optionContainer.appendChild(optionBtn);

            optionBtn.addEventListener('click', () => {
                console.log("Option clicked:", option);
                HandleOptionClick(option, currentQuestion.answer);
            });
        });
        questionContainer.classList.remove('hidden');
        optionContainer.classList.add('show');
    }, 100);
}

function HandleOptionClick(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        correctAnswerCount++;
    }
    checkAnswer(selectedOption, correctAnswer);
}

function checkAnswer(selectedOption, Answer) {
    console.log("checkAnswer called, currentQuestionIndex:", currentQuestionIndex, "total questions:", questions.length);
    
    const options = document.querySelectorAll('.option');

    options.forEach(optionBtn => {
        optionBtn.disabled = true;

        if (optionBtn.textContent === Answer) {
            optionBtn.classList.add('correct');
        } else if (optionBtn.textContent === selectedOption) {
            optionBtn.classList.add('wrong');
        }
    });

    const scoreDisplay = document.getElementById('quiz-score');
    scoreDisplay.textContent = `${correctAnswerCount} out of ${questions.length}`;
    scoreDisplay.classList.remove('hidden');

    console.log("Is last question?", currentQuestionIndex === questions.length - 1);
    
    // Clear any existing timeouts to prevent overlapping actions
    if (window.quizTimeout) {
        clearTimeout(window.quizTimeout);
    }
    
    // Set a new timeout
    window.quizTimeout = setTimeout(() => {
        if (currentQuestionIndex === questions.length - 1) {
            console.log("Finishing quiz");
            finishQuiz();
        } else {
            console.log("Going to next question");
            // Increment the question index directly here instead of clicking the button
            currentQuestionIndex++;
            showQuestion();
        }
    }, 1500);
}

function finishQuiz() {
    console.log("finishQuiz called");
    
    const scoreDisplay = document.getElementById('quiz-score');
    scoreDisplay.textContent += ' — Quiz Completed!';
    scoreDisplay.classList.remove('hidden');
    scoreDisplay.classList.add('quiz-complete-anim');
    
    // Emit quiz completed event for progress tracking
    const currentChapter = getCurrentChapter();
    if (currentChapter) {
        // Create and dispatch custom event
        const quizCompletedEvent = new CustomEvent('quizCompleted', {
            detail: {
                chapterID: `chapter${currentChapter}`,
                score: correctAnswerCount,
                totalQuestions: questions.length
            }
        });
        document.dispatchEvent(quizCompletedEvent);
        console.log(`Quiz completed event dispatched for ${currentChapter} with score ${correctAnswerCount}/${questions.length}`);
    }

    setTimeout(() => {
        const quizPopup = document.getElementById('quiz-popup');
        const questionContainer = document.querySelector('.quiz-question');
        
        quizPopup.classList.remove('show');
        questionContainer.classList.remove('show');
        
        scoreDisplay.textContent = '';
        scoreDisplay.classList.add('hidden');
        scoreDisplay.classList.remove('quiz-complete-anim');

        correctAnswerCount = 0;
        currentQuestionIndex = 0;
    }, 2000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Chapter page initialized');
    loadChapterPDFs();
    
    // Add chapter dropdown navigation
    const chapterSelect = document.querySelector('.chapter-select');
    if (chapterSelect) {
        chapterSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue && selectedValue !== getCurrentChapter()) {
                window.location.href = `${selectedValue}.html`;
            }
        });
    }
});

