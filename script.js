document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('logForm');
    const textInput = document.getElementById('textInput');
    const entriesDiv = document.getElementById('entries');

    displayEntries();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (textInput.value.trim() !== '') {
            const entry = {
                text: textInput.value,
                timestamp: new Date().toISOString()
            };
            
            let entries = JSON.parse(localStorage.getItem('entries')) || [];
            entries.push(entry);
            localStorage.setItem('entries', JSON.stringify(entries));
            
            textInput.value = '';
            displayEntries();
        }
    });

    function displayEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entriesDiv.innerHTML = '<h2 class="mb-3">Saved Entries:</h2>';
        
        entries.forEach(function(entry, index) {
            const entryElement = document.createElement('div');
            entryElement.className = 'card mb-3';
            entryElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Entry ${index + 1}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${new Date(entry.timestamp).toLocaleString()}</h6>
                    <p class="card-text">${entry.text}</p>
                </div>
            `;
            entriesDiv.appendChild(entryElement);
        });
    }
});
