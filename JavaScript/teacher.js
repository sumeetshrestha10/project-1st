// Store PDFs in localStorage for demo purposes
// In a real application, you would use a backend server
let pdfs = JSON.parse(localStorage.getItem('pdfs')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Teacher dashboard initialized');
    console.log('Current PDFs in storage:', pdfs);
    displayPDFs();
    setupFormHandler();
});

// Handle form submission
function setupFormHandler() {
    const form = document.getElementById('pdfUploadForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const chapter = document.getElementById('chapterSelect').value;
        const title = document.getElementById('pdfTitle').value;
        const file = document.getElementById('pdfFile').files[0];

        if (!file) {
            alert('Please select a PDF file');
            return;
        }

        if (!chapter) {
            alert('Please select a chapter');
            return;
        }

        // Convert PDF to base64 for storage
        const reader = new FileReader();
        reader.onload = function(e) {
            const pdfData = {
                id: Date.now(),
                chapter: String(chapter), // Ensure chapter is stored as string
                title: title,
                data: e.target.result,
                uploadDate: new Date().toLocaleDateString()
            };

            console.log('Saving new PDF:', { 
                ...pdfData, 
                data: 'BASE64_DATA',
                chapterType: typeof pdfData.chapter 
            });
            
            pdfs.push(pdfData);
            localStorage.setItem('pdfs', JSON.stringify(pdfs));
            
            // Verify the save was successful
            const savedPdfs = JSON.parse(localStorage.getItem('pdfs')) || [];
            console.log('Updated PDFs in storage:', savedPdfs.map(pdf => ({
                ...pdf,
                data: 'BASE64_DATA',
                chapterType: typeof pdf.chapter
            })));
            
            displayPDFs();
            form.reset();
            alert(`PDF "${title}" uploaded successfully to Chapter ${chapter}!`);
        };
        reader.readAsDataURL(file);
    });
}

// Display PDFs in the list
function displayPDFs() {
    const pdfList = document.getElementById('pdfList');
    pdfList.innerHTML = '';

    pdfs.forEach(pdf => {
        const pdfItem = document.createElement('div');
        pdfItem.className = 'pdf-item';
        pdfItem.innerHTML = `
            <h3>${pdf.title}</h3>
            <p>Chapter ${pdf.chapter}</p>
            <p>Uploaded: ${pdf.uploadDate}</p>
            <div class="pdf-actions">
                <button class="view-btn" onclick="viewPDF(${pdf.id})">View</button>
                <button class="delete-btn" onclick="deletePDF(${pdf.id})">Delete</button>
            </div>
        `;
        pdfList.appendChild(pdfItem);
    });
}

// View PDF function
function viewPDF(id) {
    const pdf = pdfs.find(p => p.id === id);
    if (pdf) {
        // Open PDF in new tab
        const pdfWindow = window.open();
        pdfWindow.document.write(`
            <iframe src="${pdf.data}" width="100%" height="100%" style="border: none;"></iframe>
        `);
    }
}

// Delete PDF function
function deletePDF(id) {
    if (confirm('Are you sure you want to delete this PDF?')) {
        pdfs = pdfs.filter(pdf => pdf.id !== id);
        localStorage.setItem('pdfs', JSON.stringify(pdfs));
        displayPDFs();
    }
} 