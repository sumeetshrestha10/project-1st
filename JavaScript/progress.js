// Progress tracking system
const progressTracker = {
    // Initialize the progress tracker
    init: function() {
        // Load progress data from localStorage
        this.progressData = this.loadProgress();
        this.renderProgressUI();
        this.setupEventListeners();
    },

    // Load progress data from localStorage
    loadProgress: function() {
        const savedProgress = localStorage.getItem('learnifyProgress');
        return savedProgress ? JSON.parse(savedProgress) : {
            chapters: {
                chapter1: { visited: false, quizCompleted: false, score: 0 },
                chapter2: { visited: false, quizCompleted: false, score: 0 },
                chapter3: { visited: false, quizCompleted: false, score: 0 },
                chapter4: { visited: false, quizCompleted: false, score: 0 },
                chapter5: { visited: false, quizCompleted: false, score: 0 },
                chapter6: { visited: false, quizCompleted: false, score: 0 },
                chapter7: { visited: false, quizCompleted: false, score: 0 },
                chapter8: { visited: false, quizCompleted: false, score: 0 }
            },
            totalProgress: 0,
            lastVisited: null
        };
    },

    // Save progress data to localStorage
    saveProgress: function() {
        localStorage.setItem('learnifyProgress', JSON.stringify(this.progressData));
    },

    // Mark a chapter as visited
    markChapterVisited: function(chapterID) {
        if (this.progressData.chapters[chapterID]) {
            this.progressData.chapters[chapterID].visited = true;
            this.progressData.lastVisited = chapterID;
            this.calculateTotalProgress();
            this.saveProgress();
            this.updateProgressDisplay();
        }
    },

    // Save quiz results
    saveQuizResult: function(chapterID, score, totalQuestions) {
        if (this.progressData.chapters[chapterID]) {
            const percentage = Math.round((score / totalQuestions) * 100);
            this.progressData.chapters[chapterID].quizCompleted = true;
            this.progressData.chapters[chapterID].score = percentage;
            this.calculateTotalProgress();
            this.saveProgress();
            this.updateProgressDisplay();
        }
    },

    // Calculate total progress percentage
    calculateTotalProgress: function() {
        const chapters = Object.values(this.progressData.chapters);
        const totalChapters = chapters.length * 2; // Each chapter counts for visited and quiz completed
        
        let completedItems = 0;
        chapters.forEach(chapter => {
            if (chapter.visited) completedItems++;
            if (chapter.quizCompleted) completedItems++;
        });
        
        this.progressData.totalProgress = Math.round((completedItems / totalChapters) * 100);
        return this.progressData.totalProgress;
    },

    // Set up event listeners
    setupEventListeners: function() {
        // Track current chapter
        const currentChapter = this.getCurrentChapter();
        if (currentChapter) {
            this.markChapterVisited(currentChapter);
        }

        // Listen for quiz completion events
        document.addEventListener('quizCompleted', (e) => {
            const { chapterID, score, totalQuestions } = e.detail;
            this.saveQuizResult(chapterID, score, totalQuestions);
        });
    },

    // Get current chapter from URL
    getCurrentChapter: function() {
        const path = window.location.pathname;
        const match = path.match(/chapter(\d+)\.html/);
        if (match) {
            return `chapter${match[1]}`;
        }
        return null;
    },

    // Render progress UI elements
    renderProgressUI: function() {
        // Create progress container if it doesn't exist
        const existingContainer = document.getElementById('progress-container');
        if (existingContainer) return;

        const progressContainer = document.createElement('div');
        progressContainer.id = 'progress-container';
        progressContainer.className = 'progress-container';
        let progressTitle = document.createElement('div');
        progressTitle.id = 'progress-title';
        progressTitle.innerText = "Progress";
        progressTitle.style.display = "none"
        
        // Set low progress attribute for visual effects
        if (this.progressData.totalProgress < 30) {
            progressContainer.setAttribute('data-low-progress', 'true');
        }
        
        // Create circular progress indicator
        const progressCircle = document.createElement('div');
        progressCircle.className = 'progress-circle';
        progressCircle.innerHTML = `
            <svg viewBox="0 0 36 36">
                <circle class="bg" cx="18" cy="18" r="15.91549430918954" />
                <circle class="progress" cx="18" cy="18" r="15.91549430918954" 
                    stroke-dasharray="100" 
                    stroke-dashoffset="${100 - this.progressData.totalProgress}" />
            </svg>
            <div class="progress-percentage">${this.progressData.totalProgress}%</div>
        `;

        progressCircle.addEventListener("mouseover", ()=>{
            progressTitle.style.display = "block";
        })
        progressCircle.addEventListener("mouseleave",()=>{
            progressTitle.style.display = "none";
            
        })
        
        // Add click event to navigate to progress page
        progressContainer.addEventListener('click', () => {
            window.location.href = 'progress.html';
        });
        
        progressContainer.appendChild(progressCircle);
        progressContainer.appendChild(progressTitle);
        
        // Add to page - find appropriate location
        document.body.appendChild(progressContainer);
    },

    // Update progress display
    updateProgressDisplay: function() {
        const progressCircle = document.querySelector('.progress-circle');
        const progressPercentage = document.querySelector('.progress-percentage');
        const progressContainer = document.getElementById('progress-container');
        
        if (progressCircle && progressPercentage) {
            const circle = progressCircle.querySelector('.progress');
            circle.style.strokeDashoffset = 100 - this.progressData.totalProgress;
            progressPercentage.textContent = `${this.progressData.totalProgress}%`;
            
            // Update low progress animation attribute
            if (progressContainer) {
                if (this.progressData.totalProgress < 30) {
                    progressContainer.setAttribute('data-low-progress', 'true');
                } else {
                    progressContainer.removeAttribute('data-low-progress');
                }
            }
        }
    },

    // Format chapter ID to readable name
    formatChapterName: function(chapterID) {
        const chapterMap = {
            chapter1: "Chapter 1: Introduction to OOP",
            chapter2: "Chapter 2: Classes and Objects",
            chapter3: "Chapter 3: Inheritance",
            chapter4: "Chapter 4: Polymorphism",
            chapter5: "Chapter 5",
            chapter6: "Chapter 6",
            chapter7: "Chapter 7",
            chapter8: "Chapter 8"
        };
        
        return chapterMap[chapterID] || chapterID;
    },
    
    // Get detailed progress data
    getProgressDetails: function() {
        return this.progressData;
    }
};

// Initialize progress tracker on page load
document.addEventListener('DOMContentLoaded', () => {
    progressTracker.init();
}); 